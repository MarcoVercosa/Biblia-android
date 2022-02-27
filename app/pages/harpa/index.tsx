import React, { useState, useRef } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { GetApi } from "../../api";
import { ModalHino } from "../../components/modal/hino";

interface IResultado {
    letra: string;
    titulo: string
}

export default function Harpa(): JSX.Element {
    const [modalHinoSelect, setModalHinoSelect] = useState<boolean>(false)
    const [letraBuscaAPI, setLetraBuscaAPI] = useState<Array<{ letra: [], titulo: string }>>([])


    async function OpenCloseModalHino(numeroHino: boolean | Number) {
        setModalHinoSelect(!modalHinoSelect)
        if (numeroHino) {
            let { data }: { data: IResultado[] } = await GetApi(`hinoharpa/buscatitulopornumero/${numeroHino}`)
            let separaLinhas: Array<any> = data[0].letra.split("%")
            let resultado: Array<any> = data.map((dados: any) => { return { letra: separaLinhas, titulo: dados.titulo } })
            setLetraBuscaAPI(resultado)

            console.log(resultado)
        }
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
                            {letraBuscaAPI[0].titulo}
                        </Text>
                        <FlatList
                            contentContainerStyle={styles.renderizaConteudos}
                            data={letraBuscaAPI[0].letra}
                            renderItem={({ item }: any) => <Text style={styles.conteudoLetraHino}>{item}</Text>}
                            keyExtractor={(item, index): any => index}
                        />
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#e2e2e2",
    },
    viewHeader: {
        height: "10%",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#c7d5e8",
        borderRadius: 50,
        backgroundColor: "#c7d5e8",
        marginTop: "0.7%"
    },
    modalPesquisaHino: {
        alignItems: "center",
        marginTop: "1%",
    },
    viewHinoModalImage: {
        width: "15%",
        height: "100%",
        marginLeft: "2%",
    },
    viewLetraHino: {
        height: "85.5%",
        backgroundColor: "#00e3ab",
        borderRadius: 50,
        width: "95%",
        marginTop: "5%",
        alignSelf: "center"
    },
    tituloLetraHino: {
        fontSize: 25,
        textAlign: "center",
        marginTop: "10%",
        marginBottom: "5%"
    },
    renderizaConteudos: {
        width: "95%"
    },
    conteudoLetraHino: {
        width: "100%",
        textAlign: "center",
        fontSize: 18,
    }


})