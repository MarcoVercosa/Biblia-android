import React, { useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import KeepAwake from 'react-native-keep-awake';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Share, Alert } from "react-native"
import { GetApi } from "../../api";
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";
import { ModalHino } from "../../components/modal/hino";
import { Styles } from "./style"
import { Loading } from "../../components/loading/index"
interface IResultado {
    letra: string;
    titulo: string,
}
interface IRetorno {
    letra: [];
    titulo: string,
    numero: Number
}
interface IValues {
    context: IContext
}

export default function Harpa(): JSX.Element {
    const { context }: IValues = useContext(Context) as any
    const [modalHinoSelect, setModalHinoSelect] = useState<boolean>(false)
    const [letraBuscaAPI, setLetraBuscaAPI] = useState<Array<IRetorno>>([])
    const [loading, setLoading] = useState<string>("")
    const styles = Styles()
    context.keepScreenOn ? KeepAwake.activate() : KeepAwake.deactivate()//tela sempre ligada ou não  

    function Compartilhar(titulo: string, numeroHino: string) {
        Share.share({
            message: `http://vidadafonte.com.br/harpacrista \n Hino da harpa: ${titulo} - ${numeroHino}`,
            title: 'http://vidadafonte.com.br/harpacrista',
        })
    }
    async function OpenCloseModalHino(numeroHino: boolean | Number, openCLoseModal: boolean) {
        setModalHinoSelect(openCLoseModal)
        if (numeroHino) {
            setLoading("Buscando louvor para Deus")
            try {
                let { data }: { data: IResultado[] } = await GetApi(`hinoharpa/buscatitulopornumero/${numeroHino}`)
                let separaLinhas: Array<any> = data[0].letra.split("%")
                let resultado: Array<any> = data.map((dados: any) => { return { letra: separaLinhas, titulo: dados.titulo, numero: numeroHino } })
                setLetraBuscaAPI(resultado)
                setLoading("")
                AsyncStorage.setItem("UltimoHino", JSON.stringify(numeroHino))
            } catch (err) {
                Alert.alert("Houve alguma dificuldade no caminho.")
                setLoading("")
            }
        }
    }
    useEffect(() => {
        let UltimoHinoLocalStorage = async () => {
            let data = await AsyncStorage.getItem("UltimoHino")
            if (data) {
                OpenCloseModalHino(JSON.parse(data), false)
            }
        }
        UltimoHinoLocalStorage()
    }, [])

    if (loading) {
        return (<Loading motivo={loading} />)
    }
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={styles.modalPesquisaHino}
                    onPressOut={() => OpenCloseModalHino(false, true)}
                >
                    <Image
                        source={require("../../assets/images/music.jpg")}
                        style={styles.viewHinoModalImage}
                    />
                </TouchableOpacity>
                <ModalHino modalHinoSelect={modalHinoSelect} OpenCloseModalHino={OpenCloseModalHino} />
            </View >
            <View style={styles.viewLetraHino}>
                {
                    letraBuscaAPI.length > 0 &&
                    <>
                        <Text style={styles.tituloLetraHino}>
                            {letraBuscaAPI[0].titulo} - {letraBuscaAPI[0].numero}

                        </Text>
                        <TouchableOpacity style={styles.conteudoLetraHinoButtonShare}
                            onPress={() => { Compartilhar(letraBuscaAPI[0].titulo, String(letraBuscaAPI[0].numero)) }}
                        >
                            <Image
                                source={require("../../assets/images/share.jpg")}
                                style={styles.conteudoLetraHinoImageShare}
                            />
                        </TouchableOpacity>

                        <FlatList
                            contentContainerStyle={styles.renderizaConteudos}
                            data={letraBuscaAPI[0].letra}
                            renderItem={({ item }: any) => <Text style={styles.conteudoLetraHino}

                            >{item}</Text>}
                            keyExtractor={(item, index): any => index}
                        />

                    </>
                }
            </View>
        </SafeAreaView>
    )
}

