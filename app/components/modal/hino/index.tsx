import React, { useState, useEffect } from "react"
import { View, Text, Modal, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image, Alert, FlatList } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { GetApi } from "../../../api/index"
import { IResutadoPorPalavra } from "../../../interface/IResultadoPorPalavra";
import RenderizaHinoPorPalavra from "../../harpa/renderizaPesquisaporPalavra";
import Loading from "../../loading";
import { styles } from "./style"

function ModalHino({ modalHinoSelect, OpenCloseModalHino }: { modalHinoSelect: boolean, OpenCloseModalHino: (numeroHino: boolean | Number) => void }) {

    const [numerosHinoAPI, setNumerosHinoAPI] = useState<Array<number>>([])
    const [hinosBuscaPorPalavraAPI, setHinosBuscaPorPalavraAPI] = useState<Array<IResutadoPorPalavra>>()
    const [numeroHinoSelect, setNumeroHinoSelect] = useState<number>(1)
    const [letraHinoBusca, setLetraHinoBusca] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const FetchNumerosAPI = async (): Promise<void> => {
            let { data } = await GetApi("hinoharpa/buscanumeroharpa")
            setNumerosHinoAPI(await data)
        }
        FetchNumerosAPI()
    }, [])

    async function BuscaHinosPorPalavra(): Promise<void> {
        if (letraHinoBusca.length < 3 || letraHinoBusca.length > 20) {
            Alert.alert("Digite ao menos 2 letras ou no máximo 20 letras")
            return
        }
        setLoading(true)
        let { data } = await GetApi(`hinoharpa/buscatituloporpalavra/${letraHinoBusca}`)
        if (await data.length < 1) {// se não retornar nada
            setLoading(false)
            Alert.alert(`Não foi encontrado nenhum hino com a palavra ${letraHinoBusca}`)
            setHinosBuscaPorPalavraAPI([])
            return
        }
        setHinosBuscaPorPalavraAPI(await data)
        setLoading(false)
    }

    if (loading) {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalHinoSelect}
                onRequestClose={() => OpenCloseModalHino(false)}
            >
                <Loading />
            </Modal>
        )
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
                        onPress={() => OpenCloseModalHino(false)}
                    >
                        <Image
                            source={require("../../../assets/images/back.jpg")}
                            style={styles.viewHeaderImage}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titulo}>
                        Selecione suas opções:
                    </Text>

                </View>
                <View style={styles.viewBuscaPorNumero}>
                    <Text style={styles.textSelectNumeroHino} >
                        Por número
                    </Text>
                    <Picker
                        style={styles.selectNumeroHino}
                        selectedValue={numeroHinoSelect}
                        onValueChange={(value: number) => {
                            setNumeroHinoSelect(value)
                            OpenCloseModalHino(value)
                        }}

                        mode="dropdown"
                    >
                        {numerosHinoAPI.length > 0 &&
                            numerosHinoAPI.map((data: any, index: number) => <Picker.Item key={index} label={String(data.numero)} value={data.numero} />)
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

                <View style={styles.viewRenderizaHinos}>
                    <FlatList
                        numColumns={2}
                        contentContainerStyle={styles.renderizaHinos}
                        data={hinosBuscaPorPalavraAPI}
                        renderItem={({ item, index }) => <RenderizaHinoPorPalavra item={item} index={index} OpenCloseModalHino={OpenCloseModalHino} />}
                        keyExtractor={(item, index): any => index}
                    />
                </View>

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

export { ModalHino }