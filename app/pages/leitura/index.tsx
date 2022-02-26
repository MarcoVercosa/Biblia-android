import React, { useState, useRef } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native"
import { Picker } from '@react-native-picker/picker';
import ModalLeitura from "../../components/modal/leitura"
import { styles } from "./style"
import { GetApi } from "../../api"
import { RenderizaVersiculos } from "../../components/leitura/renderVersiculos";
import { RenderizaCuriosidades } from "../../components/leitura/renderizaCuriosidades";
import { IValoresArmazenados } from "../../interface/ImodalLeitura"
import { IRetornoApiLeitura } from "../../interface/IRetornoApiLeitura"
import { ICuriosidades } from "../../interface/ICuriosidades";


export default function Leitura(): JSX.Element {

    const [modalLeitura, setModalLeitura] = useState<boolean>(false)
    const [dadosLeituraRetornoApi, setDadosLeituraRetornoApi] = useState<IRetornoApiLeitura>()
    const [dadosSelecionadosModal, setDadosSelecionadosModal] = useState<IValoresArmazenados>()
    const [curiosidades, setCuriosidades] = useState<any | Array<ICuriosidades>>(false)
    const scrollRef: any = useRef();

    async function OpenCloseModalLeitura(dataToFetch?: IValoresArmazenados | any) {
        setModalLeitura(!modalLeitura)
        if (dataToFetch) {
            let { data } = await GetApi(`mais/buscaconteudo/${dataToFetch.versao.versao_id}/${dataToFetch.testamento.testamento_id}/${dataToFetch.livro.livro_id}/${dataToFetch.capitulo}`)
            setDadosSelecionadosModal(dataToFetch)
            setDadosLeituraRetornoApi(data)
            let resultado = await GetApi(`curiosidades/buscacuriosidade/${dataToFetch?.livro.livro_nome}`)
            setCuriosidades(resultado)
        }
    }

    function RenderizaSelectCapitulo() {
        let renderiza = []
        for (let i = 1; i <= dadosLeituraRetornoApi!.quantidadecapitulo[0].capitulo; i++) {
            renderiza.push(<Picker.Item label={String(i)} value={i} />)
        }
        return renderiza
    }
    const ScrollToTop = () => {
        scrollRef.current.scrollTo({
            y: 0,
            animated: true,
        });
    }
    async function AvancaCapitulo() {
        let { data } = await GetApi(`mais/buscaconteudo/${dadosSelecionadosModal!.versao.versao_id}/${dadosSelecionadosModal!.testamento.testamento_id}/${dadosSelecionadosModal!.livro.livro_id}/${dadosLeituraRetornoApi!.capituloAtual + 1}`)
        setDadosLeituraRetornoApi(data)
        ScrollToTop()
    }
    async function RetornaCapitulo() {
        let { data } = await GetApi(`mais/buscaconteudo/${dadosSelecionadosModal!.versao.versao_id}/${dadosSelecionadosModal!.testamento.testamento_id}/${dadosSelecionadosModal!.livro.livro_id}/${dadosLeituraRetornoApi!.capituloAtual - 1}`)
        setDadosLeituraRetornoApi(data)
        ScrollToTop()
    }
    async function NavegaPorSelect(capituloValor: number) {
        let { data } = await GetApi(`mais/buscaconteudo/${dadosSelecionadosModal!.versao.versao_id}/${dadosSelecionadosModal!.testamento.testamento_id}/${dadosSelecionadosModal!.livro.livro_id}/${capituloValor}`)
        setDadosLeituraRetornoApi(data)
        ScrollToTop()
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
                {dadosLeituraRetornoApi &&
                    <>
                        <View style={styles.viewContainerLeituraInfo}>
                            <Text style={styles.textContainerLeituraInfo}>
                                {dadosLeituraRetornoApi.nomeLivro[0].livro_nome}: {dadosLeituraRetornoApi.capituloAtual} - '{dadosLeituraRetornoApi.nomeLivro[0].livro_abreviado}'
                            </Text>
                            <Text style={styles.textContainerLeituraInfo}>
                                {dadosLeituraRetornoApi.nomeVersao[0].versao_nome}
                            </Text>
                        </View>
                        <ScrollView ref={scrollRef} >
                            <View style={styles.viewContainerLeituraVersiculos}>
                                {dadosLeituraRetornoApi.conteudo.map((data, index) => <RenderizaVersiculos data={data} index={index} />)}
                            </View>
                            <View style={styles.viewContainerArrows}>
                                <TouchableOpacity style={styles.arrowsButton}
                                    //se o capitulo for o primeiro, desative a seta para voltar
                                    disabled={dadosLeituraRetornoApi.capituloAtual == 1 ? true : false}
                                    onPress={() => RetornaCapitulo()}
                                >
                                    <Image
                                        source={require("../../assets/images/left_arrow.jpg")}
                                        style={styles.arrows}
                                    />
                                    <Text style={styles.arrowsText}>
                                        {/* se o capitulo for igual a 1, permaneça 1 para não permitir o número zero */}
                                        {dadosLeituraRetornoApi.nomeLivro[0].livro_nome} - {dadosLeituraRetornoApi.capituloAtual == 1 ? 1 : dadosLeituraRetornoApi.capituloAtual - 1}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.viewSelectCapitulo}>
                                    <Picker
                                        style={styles.selectCapitulo}
                                        selectedValue={dadosLeituraRetornoApi?.capituloAtual}
                                        onValueChange={(value: number) => { NavegaPorSelect(value) }}
                                        mode="dropdown"
                                    >
                                        {dadosLeituraRetornoApi.quantidadecapitulo[0].capitulo &&
                                            RenderizaSelectCapitulo()
                                        }
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.arrowsButton}
                                    onPressOut={() => AvancaCapitulo()}
                                    //se o capitulo for o ultimo, desative a seta para avançar
                                    disabled={dadosLeituraRetornoApi.capituloAtual == dadosLeituraRetornoApi.quantidadecapitulo[0].capitulo ? true : false}
                                >
                                    <Image
                                        source={require("../../assets/images/right_arrow.jpg")}
                                        style={styles.arrows}
                                    />
                                    <Text style={styles.arrowsText}>
                                        {dadosLeituraRetornoApi.nomeLivro[0].livro_nome} - {dadosLeituraRetornoApi.capituloAtual == dadosLeituraRetornoApi.quantidadecapitulo[0].capitulo ? dadosLeituraRetornoApi.capituloAtual : dadosLeituraRetornoApi.capituloAtual + 1}
                                    </Text >
                                </TouchableOpacity>
                            </View>

                            <View style={styles.viewCuriosidades}>
                                <Text style={styles.tituloCuriosidades} >CURIOSIDADES</Text>
                                {curiosidades && curiosidades.data.map((data: any) => <RenderizaCuriosidades data={data} />)}
                            </View>
                        </ScrollView>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}
