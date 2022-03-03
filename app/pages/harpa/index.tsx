import React, { useState } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Share } from "react-native"
import { GetApi } from "../../api";
import { ModalHino } from "../../components/modal/hino";
import { styles } from "./style"
import Loading from "../../components/loading/index"

interface IResultado {
    letra: string;
    titulo: string,
}

interface IRetorno {
    letra: [];
    titulo: string,
    numero: Number
}

export default function Harpa(): JSX.Element {
    const [modalHinoSelect, setModalHinoSelect] = useState<boolean>(false)
    const [letraBuscaAPI, setLetraBuscaAPI] = useState<Array<IRetorno>>([])
    const [loading, setLoading] = useState<boolean>(false)

    function onClick(titulo: string, nmeroHino: string) {
        Share.share({
            message: `Hino da harpa: ${titulo} - ${nmeroHino}`,
            url: 'http://vidadafonte.com.br/harpacrista',
            title: `${titulo} - ${nmeroHino}`
        },
        )
    }


    async function OpenCloseModalHino(numeroHino: boolean | Number) {
        setModalHinoSelect(!modalHinoSelect)
        if (numeroHino) {
            setLoading(true)
            let { data }: { data: IResultado[] } = await GetApi(`hinoharpa/buscatitulopornumero/${numeroHino}`)
            let separaLinhas: Array<any> = data[0].letra.split("%")
            let resultado: Array<any> = data.map((dados: any) => { return { letra: separaLinhas, titulo: dados.titulo, numero: numeroHino } })
            setLetraBuscaAPI(resultado)
            setLoading(false)
        }
    }

    if (loading) {
        return (<Loading />)
    }
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={styles.modalPesquisaHino}
                    onPressOut={() => OpenCloseModalHino(false)}
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
                            onPress={() => { onClick(letraBuscaAPI[0].titulo, String(letraBuscaAPI[0].numero)) }}
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

