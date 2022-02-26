import React, { useState, useEffect } from "react"
import { View, Text, Modal, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image, Alert, FlatList } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { GetApi } from "../../../api/index"
import { IResutadoPorPalavra } from "../../../interface/IResultadoPorPalavra";
import RenderizaHinoPorPalavra from "../../harpa/renderizaPesquisaporPalavra";



function ModalHino({ modalHinoSelect, OpenCloseModalHino }: any) {

    const [numerosHinoAPI, setNumerosHinoAPI] = useState<Array<number>>([])
    const [hinosBuscaPorPalavraAPI, setHinosBuscaPorPalavraAPI] = useState<Array<IResutadoPorPalavra>>()
    const [numeroHinoSelect, setNumeroHinoSelect] = useState<number>(1)
    const [letraHinoBusca, setLetraHinoBusca] = useState<string>("")


    useEffect(() => {
        const FetchNumerosAPI = async (): Promise<void> => {
            let { data } = await GetApi("hinoharpa/buscanumeroharpa")
            setNumerosHinoAPI(await data)
        }
        FetchNumerosAPI()
    }, [])

    async function BuscaHinosPorPalavra(): Promise<void> {
        if (letraHinoBusca.length < 3 || letraHinoBusca.length > 15) {
            Alert.alert("Digite ao menos 2 letras ou no máximo 15 letras")
            return
        }
        let { data } = await GetApi(`hinoharpa/buscatituloporpalavra/${letraHinoBusca}`)
        if (await data.length < 1) {// se não retornar nada
            Alert.alert(`Não foi encontrado nenhum hino com a palavra ${letraHinoBusca}`)
            return
        }
        setHinosBuscaPorPalavraAPI(await data)
    }


    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalHinoSelect}
                onRequestClose={() => OpenCloseModalHino(false)}
            >

                <View style={styles.viewHeader}>
                    <TouchableOpacity
                        style={[styles.botaoSair]}
                        onPressOut={() => OpenCloseModalHino(false)}
                    >
                        <Image
                            source={require("../../../assets/images/back.jpg")}
                            style={styles.viewHeaderImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>
                        Selecione sua opções
                    </Text>

                </View>
                <View style={styles.viewBuscaPorNumero}>
                    <Text style={styles.textSelectNumeroHino} >
                        Por número
                    </Text>
                    <Picker
                        style={styles.selectNumeroHino}
                        selectedValue={numeroHinoSelect}
                        onValueChange={(value: number) => { setNumeroHinoSelect(value) }}
                        //onFocus={() => console.log(hino)}
                        mode="dropdown"
                    >
                        {numerosHinoAPI.length > 0 &&
                            numerosHinoAPI.map((data: any) => <Picker.Item label={String(data.numero)} value={data.numero} />)
                        }
                    </Picker>
                </View>


                <View style={styles.viewBuscaPorPalavra}>

                    <Text style={styles.textBuscaPorPalavraHino} >
                        Por Palavra
                    </Text>
                    <TextInput
                        style={styles.inputBuscaPorPalavraHino}
                        onChangeText={(value: string) => setLetraHinoBusca(value)}
                        value={letraHinoBusca}
                        placeholder="Digite"
                    />
                </View>

                <FlatList
                    data={hinosBuscaPorPalavraAPI}
                    renderItem={({ item }) => <RenderizaHinoPorPalavra item={item} />}
                    keyExtractor={({ item, index }: any) => index}
                />

                <TouchableOpacity
                    style={styles.botaoBuscaPorPalavraHino}
                    onPressOut={BuscaHinosPorPalavra}
                >
                    <Text style={styles.view_botoes_text}>
                        Buscar
                    </Text>
                </TouchableOpacity>


            </Modal>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    viewHeader: {
        flexDirection: "row",
        height: "8%",
        justifyContent: "space-between",
        paddingTop: "1%"
    },
    botaoSair: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: "100%",
        borderRadius: 30,
    },
    viewHeaderImage: {
        height: "100%",
        width: "70%",
    },

    titulo: {
        fontSize: 28,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#08a0ff",
        height: "100%",
        width: "80%",
        borderRadius: 30
    },
    viewBuscaPorNumero: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",

    },
    textSelectNumeroHino: {
        fontSize: 25,
        width: "45%",

    },
    selectNumeroHino: {
        width: "45%",
        backgroundColor: "#e5e5e5",
    },
    viewBuscaPorPalavra: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    textBuscaPorPalavraHino: {
        fontSize: 25,
        width: "45%",
    },
    inputBuscaPorPalavraHino: {
        width: "45%",
        backgroundColor: "#e5e5e5",
        fontSize: 21
    },
    botaoBuscaPorPalavraHino: {
        backgroundColor: "#03fa54",
        marginTop: "5%",
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: "8%",
        borderRadius: 30,
    },
    view_botoes_text: {
        fontSize: 20,
        fontWeight: "bold"
    },



})

export { ModalHino }