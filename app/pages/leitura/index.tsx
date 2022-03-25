import React, { useState, useRef, useEffect, useContext } from "react"
import KeepAwake from 'react-native-keep-awake';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Picker } from '@react-native-picker/picker';
import GestureRecognizer from 'react-native-swipe-gestures';
import ModalLeitura from "../../components/modal/leitura"
import { Context } from "../../routes";
import { ContextFavoritos } from "../../routes";
import { Styles } from "./style";
import { GetApi } from "../../api"
import { RenderizaVersiculos } from "../../components/leitura/renderVersiculos";
import { RenderizaCuriosidades } from "../../components/leitura/renderizaCuriosidades";
import { Loading } from "../../components/loading";
import { IValoresArmazenados } from "../../interface/ImodalLeitura"
import { IRetornoApiLeitura } from "../../interface/IRetornoApiLeitura"
import { ICuriosidades } from "../../interface/ICuriosidades";
import { IContext, IContextAppFavoritos } from "../../interface/IContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarregaUtimaLeituraLocalStorage, CarregaFavoritosLocalStorage } from "../../components/leitura/services/carregaDataLocalStorage"

interface IValues {
    context: IContext
}

interface IValuesFavoritos {
    contextFavoritos: IContextAppFavoritos;
    setContextFavoritos: (value: any) => void
}
export default function Leitura({ route, navigation }: any): JSX.Element {
    const { context }: IValues = useContext(Context) as any
    const { contextFavoritos, setContextFavoritos }: IValuesFavoritos = useContext(ContextFavoritos) as any
    context.keepScreenOn ? KeepAwake.activate() : KeepAwake.deactivate()//tela sempre ligada ou não    
    let styles = Styles()
    const [modalLeitura, setModalLeitura] = useState<boolean>(false)
    const [dadosLeituraRetornoApi, setDadosLeituraRetornoApi] = useState<IRetornoApiLeitura>()
    const [dadosSelecionadosModal, setDadosSelecionadosModal] = useState<any | IValoresArmazenados>()
    const [curiosidades, setCuriosidades] = useState<any | Array<ICuriosidades>>(false)
    const [loading, setLoading] = useState<string>("")
    const scrollRef: any = useRef();

    useEffect(() => {
        // ===== >>> ao selecionar uma conteudo no componente "Pesquisar", ele direcionará para esse componente, e passará os dados via props (route)
        //  ===== >>>> se houver dados nos params da rota, significa que houve um direcionamento do componente Pesquisa
        if (route.params != undefined) {
            BuscaPalavraPesquisada()
        }
        async function BuscaPalavraPesquisada() {
            setLoading("Encontrando sua pesquisa ...") //chama o componente para loading
            try {
                let { data } = await GetApi(`mais/buscaconteudo/${route.params.versao_id}/${route.params.livro_testamento_id}/${route.params.livro_id}/${route.params.capitulo}`)

                //aqui montamos um obj não qual as funções de avançar e voltar as utilizam
                let modal = {
                    versao: {
                        versao_id: route.params.versao_id
                    },
                    testamento: {
                        testamento_id: route.params.livro_testamento_id
                    },
                    livro: {
                        livro_id: route.params.livro_id,
                        livro_nome: route.params.livro_nome
                    },
                    capitulo: route.params.capitulo,
                    versiculo: route.params.versiculo
                }
                let { versao, testamento, livro, capitulo, versiculo } = modal
                setDadosSelecionadosModal({
                    versao, testamento, livro, capitulo, versiculo
                })  // armazena a selação para leitura
                setDadosLeituraRetornoApi(data) // armazena o retorno da api
                let resultado = await GetApi(`curiosidades/buscacuriosidade/${route.params?.livro_nome}`)
                setCuriosidades(resultado)
                setLoading("")
                AsyncStorage.setItem("ultimaLeitura", JSON.stringify({ modal }))
            } catch (err) { Alert.alert("Ocorreu algum erro, tente novamente em instantes") }
        }
        //se houver alteração no params da props (componente pesquisa), o useEffect irá executar
    }, [route.params])

    useEffect(() => {
        const FavoritosEUltimaLeituraLocalStorage = async () => {
            setContextFavoritos(await CarregaFavoritosLocalStorage(contextFavoritos))//verifica se há favoritos guardado no LocalStorage e armazena
            OpenCloseModalLeitura(await CarregaUtimaLeituraLocalStorage(), false) ///se houve leitura guardada no LocalStorage, chama OpenCloseModalLeitura com os params
        }
        FavoritosEUltimaLeituraLocalStorage()
    }, [])

    async function OpenCloseModalLeitura(dataToFetch?: IValoresArmazenados | any, openCloseModal?: boolean) {
        setModalLeitura(openCloseModal!)
        if (dataToFetch) {
            setLoading("Buscando sua leitura ...") //chama o componente para loading
            try {
                let { data } = await GetApi(`mais/buscaconteudo/${dataToFetch.versao.versao_id}/${dataToFetch.testamento.testamento_id}/${dataToFetch.livro.livro_id}/${dataToFetch.capitulo}`)
                setDadosSelecionadosModal(dataToFetch) // armazena a selação para leitura
                setDadosLeituraRetornoApi(data) // armazena o retorno da api
                let resultado = await GetApi(`curiosidades/buscacuriosidade/${dataToFetch?.livro.livro_nome}`)
                setCuriosidades(resultado)
                setLoading("")
                AsyncStorage.setItem("ultimaLeitura", JSON.stringify({ modal: dataToFetch }))
            } catch (err) {
                Alert.alert("Houve alguma dificuldade no caminho.")
                setLoading("")
            }
        }
    }
    function RenderizaSelectCapitulo() {
        let renderiza = []
        for (let i = 1; i <= dadosLeituraRetornoApi!.quantidadecapitulo[0].capitulo; i++) {
            renderiza.push(<Picker.Item label={String(i)} value={i} />)
        }
        return renderiza
    }
    //usado nas funções para que o scrollview role para o início
    const ScrollToTop = () => {
        scrollRef.current.scrollTo({
            y: 0,
            animated: false,
        });
    }
    async function AvancaCapitulo() {
        if (dadosLeituraRetornoApi!.capituloAtual == dadosLeituraRetornoApi!.quantidadecapitulo[0].capitulo) { return }
        setLoading("Avançando para o próximo versiculo")
        try {
            let { data } = await GetApi(`mais/buscaconteudo/${dadosSelecionadosModal!.versao.versao_id}/${dadosSelecionadosModal!.testamento.testamento_id}/${dadosSelecionadosModal!.livro.livro_id}/${dadosLeituraRetornoApi!.capituloAtual + 1}`)
            setDadosSelecionadosModal((prevState: IValoresArmazenados) => { return { ...prevState, versiculo: 0 } })
            //versiculo = 0 // > se houver dados nos params da rota,significa que houve um direcionamento do componente Pesquisa
            //ao avançar ou voltar, não precisamos mais do versiculo chamativo, então para avançar ou voltar garantimos que a versiculo fique 0 (null)
            setDadosLeituraRetornoApi(data)
            setLoading("")
            ScrollToTop()
        } catch (err) {
            Alert.alert("Houve alguma dificuldade no caminho.")
            setLoading("")
        }
    }
    async function RetornaCapitulo() {
        if (dadosLeituraRetornoApi!.capituloAtual == 1) { return }
        setLoading("Retornando para o versiculo anterior")
        try {
            let { data } = await GetApi(`mais/buscaconteudo/${dadosSelecionadosModal!.versao.versao_id}/${dadosSelecionadosModal!.testamento.testamento_id}/${dadosSelecionadosModal!.livro.livro_id}/${dadosLeituraRetornoApi!.capituloAtual - 1}`)
            setDadosSelecionadosModal((prevState: IValoresArmazenados) => { return { ...prevState, versiculo: 0 } })
            setDadosLeituraRetornoApi(data)
            setLoading("")
            ScrollToTop()
        } catch (err) {
            Alert.alert("Houve alguma dificuldade no caminho.")
            setLoading("")
        }
    }
    async function NavegaPorSelect(capituloValor: number) {
        setLoading("Indo até o capítulo selecionado")
        try {
            let { data } = await GetApi(`mais/buscaconteudo/${dadosSelecionadosModal!.versao.versao_id}/${dadosSelecionadosModal!.testamento.testamento_id}/${dadosSelecionadosModal!.livro.livro_id}/${capituloValor}`)
            setDadosSelecionadosModal((prevState: IValoresArmazenados) => { return { ...prevState, versiculo: 0 } })
            setDadosLeituraRetornoApi(data)
            setLoading("")
            ScrollToTop()
        } catch (err) {
            Alert.alert("Houve alguma dificuldade no caminho.")
            setLoading("")
        }
    }
    if (loading) {
        return (<Loading motivo={loading} />)
    }
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={styles.leituraButton}
                    onPressOut={() => (OpenCloseModalLeitura(undefined, true))}
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
                        <ScrollView ref={scrollRef}>
                            <View style={styles.viewContainerLeituraVersiculos}>
                                <GestureRecognizer
                                    onSwipeLeft={() => AvancaCapitulo()}
                                    onSwipeRight={() => RetornaCapitulo()}
                                    config={{
                                        velocityThreshold: 0.5,
                                        directionalOffsetThreshold: 500,
                                    }} style={{
                                        flex: 1, width: "100%"
                                    }}>
                                    {dadosLeituraRetornoApi.conteudo.map((data, index) =>
                                        //dataParagrafo => usado no componente <RenderizaVersiculos/> para renderizar os versiculos e no modal opcoes
                                        //versiculoPesquisa se existir, é pq houve uma pesquisa  no componente pesquisa, e será sublinhado no <RenderizaVersiculos/>
                                        //dataNumeros e dataNomes são usados no <RenderizaVersiculos/>, pois ao segurar o versiculo, irá  habilitar um modal que usará as informações
                                        <RenderizaVersiculos navigation={navigation} dataParagrafo={data} dataNumeros={dadosSelecionadosModal}
                                            dataNomes={dadosLeituraRetornoApi} index={index} versiculoPesquisa={dadosSelecionadosModal.versiculo}
                                        />
                                    )}
                                </GestureRecognizer>
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
                                    onPress={() => AvancaCapitulo()}
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
                            {curiosidades.data.length > 0 &&
                                <View style={styles.viewCuriosidades}>
                                    <Text style={styles.tituloCuriosidades} >CURIOSIDADES</Text>
                                    {curiosidades.data.map((data: any) => <RenderizaCuriosidades data={data} />)}

                                </View>
                            }
                        </ScrollView>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}
