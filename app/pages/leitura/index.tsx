import React, { useState } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker';
import ModalLeitura from "../../components/modal/leitura"
import { styles } from "./style"
import { GetApi } from "../../api"
import { IValoresArmazenados } from "../../interface/ImodalLeitura"
import { IRetornoApiLeitura } from "../../interface/IRetornoApiLeitura"


export default function Leitura(): JSX.Element {

    const [modalLeitura, setModalLeitura] = useState<boolean>(false)
    const [dadosSelecionadosModal, setDadosSelecionadosModal] = useState<IRetornoApiLeitura>()
    const [selectOptionCapitulo, setSelectOptionCapitulo] = useState<number>(0)

    async function OpenCloseModalLeitura(dataToFetch?: IValoresArmazenados | any) {
        setModalLeitura(!modalLeitura)
        if (dataToFetch) {
            console.log(dataToFetch)
            let { data } = await GetApi(`mais/buscaconteudo/${dataToFetch.versao.versao_id}/${dataToFetch.testamento.testamento_id}/${dataToFetch.livro.livro_id}/${dataToFetch.capitulo}`)
            setDadosSelecionadosModal(data)
        }
    }

    function RenderizaSelectCapitulo() {
        let renderiza = []
        for (let i = 1; i < dadosSelecionadosModal!.quantidadecapitulo[0].capitulo; i++) {
            renderiza.push(<Picker.Item label={String(i)} value={i} />)
        }
        return renderiza
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={styles.leituraButton}
                    onPressOut={() => (OpenCloseModalLeitura())}
                >
                    <Image
                        source={require("../../assets/images/find_book.jpg")}
                        style={styles.viewHeaderImage}
                    />
                </TouchableOpacity>
                <ModalLeitura modalLeitura={modalLeitura} OpenCloseModalLeitura={OpenCloseModalLeitura} />
            </View>
            <View style={styles.viewContainerLeitura}>
                {dadosSelecionadosModal &&
                    <>
                        <View style={styles.viewContainerLeituraInfo}>
                            <Text style={styles.textContainerLeituraInfo}>
                                {dadosSelecionadosModal.nomeLivro[0].livro_nome}: {dadosSelecionadosModal.capituloAtual} - '{dadosSelecionadosModal.nomeLivro[0].livro_abreviado}'
                            </Text>
                            <Text style={styles.textContainerLeituraInfo}>
                                {dadosSelecionadosModal.nomeVersao[0].versao_nome}
                            </Text>
                        </View>
                        <ScrollView >
                            <View style={styles.viewContainerLeituraVersiculos}>
                                {dadosSelecionadosModal.conteudo.map((data, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <Text key={index} style={styles.textContainerLeituraVersiculos}>
                                                {index + 1} - {data.conteudo}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                }
                            </View>
                            <View style={styles.viewContainerArrows}>
                                <TouchableOpacity style={styles.arrowsButton}>
                                    <Image
                                        source={require("../../assets/images/left_arrow.jpg")}
                                        style={styles.arrows}
                                    />
                                    <Text style={styles.arrowsText}>
                                        {dadosSelecionadosModal.nomeLivro[0].livro_nome} - {dadosSelecionadosModal.capituloAtual - 1}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.viewSelectCapitulo}>
                                    <Picker
                                        style={styles.selectCapitulo}
                                        selectedValue={dadosSelecionadosModal?.capituloAtual}
                                        onValueChange={(value: number) => { }}
                                        mode="dropdown"
                                    >
                                        {dadosSelecionadosModal.quantidadecapitulo[0].capitulo &&
                                            RenderizaSelectCapitulo()
                                        }
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.arrowsButton}>
                                    <Image
                                        source={require("../../assets/images/right_arrow.jpg")}
                                        style={styles.arrows}
                                    />
                                    <Text style={styles.arrowsText}>
                                        {dadosSelecionadosModal.nomeLivro[0].livro_nome} - {dadosSelecionadosModal.capituloAtual + 1}
                                    </Text >
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </>

                }
            </View>
        </SafeAreaView>
    )
}
