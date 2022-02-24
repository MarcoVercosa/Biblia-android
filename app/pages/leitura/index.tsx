import React, { useState } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native"
import ModalLeitura from "../../components/modal/leitura"
import { styles } from "./style"
import { GetApi } from "../../api"
import { IValoresArmazenados } from "../../interface/ImodalLeitura"
import { IRetornoApiLeitura } from "../../interface/IRetornoApiLeitura"


export default function Leitura(): JSX.Element {

    const [modalLeitura, setModalLeitura] = useState<boolean>(false)
    const [dadosSelecionadosModal, setDadosSelecionadosModal] = useState<IRetornoApiLeitura>()

    async function OpenCloseModalLeitura(dataToFetch?: IValoresArmazenados | any) {
        console.log("chamou OpenCloseModalLeitura")
        console.log(dataToFetch)
        setModalLeitura(!modalLeitura)

        if (dataToFetch) {
            console.log("chamou OpenCloseModalLeitura dentro do if")
            console.log(dataToFetch)
            let { data } = await GetApi(`mais/buscaconteudo/${dataToFetch.versao.versao_id}/${dataToFetch.testamento.testamento_id}/${dataToFetch.livro.livro_id}/${dataToFetch.capitulo}`)
            console.log(data)
            setDadosSelecionadosModal(data)
        }
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
                        <ScrollView>
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
                        </ScrollView>
                    </>

                }
            </View>
        </SafeAreaView>
    )
}
