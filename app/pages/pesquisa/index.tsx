import React, { useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, FlatList } from "react-native"
import { GetApi } from "../../api"
import Loading from "../../components/loading/index"


interface IResultadoAPI {
    capitulo: number;
    conteudo: string;
    livro_abreviado: string;
    livro_id: number;
    livro_nome: string;
    livro_testamento_id: number;
    versao_id: number;
    versiculo: number;
}
interface FlatListConteudo {
    item: IResultadoAPI
}

export default function Pesquisa({ navigation }: any): JSX.Element {

    const [palavraDigitada, setPalavraDigitada] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [dataApi, setDataApi] = useState<Array<IResultadoAPI>>()

    async function BuscarPesquisa() {
        setLoading(true)
        let { data }: any = await GetApi(`mais/pesquisa/${palavraDigitada}`)
        setDataApi(data)
        setLoading(false)
    }

    function DirecionaParaLeitura(livro_nome: string, versao_id: number, livro_testamento_id: number, livro_id: number, capitulo: number, versiculo: number) {
        navigation.navigate("Leitura", { livro_nome, versao_id, livro_testamento_id, livro_id, capitulo, versiculo })

    }

    if (loading) {
        return <Loading />
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.viewCampoPesquisa}>
                    <TextInput
                        style={styles.textInputCampoPesquisa}
                        value={palavraDigitada}
                        onChangeText={(value: string) => { setPalavraDigitada(value) }}
                        placeholder="Digite"
                    />
                    <TouchableOpacity style={styles.buttonPesquisar}
                        onPress={BuscarPesquisa}
                    >
                        <Text style={styles.textButton}>Pesquisar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewConteudo}>
                    <FlatList
                        //numColumns={2}
                        contentContainerStyle={styles.flatListRenderizaConteudo}
                        data={dataApi}
                        renderItem={({ item }: FlatListConteudo) => {
                            return (
                                <TouchableOpacity style={styles.buttonRenderizaConteudo}
                                    onPress={() => { DirecionaParaLeitura(item.livro_nome, item.versao_id, item.livro_testamento_id, item.livro_id, item.capitulo, item.versiculo) }}
                                >
                                    <Text style={styles.textRenderizaConteudo}>{item.conteudo}</Text>
                                    <Text style={styles.textRenderizaOrigem}>{`${item.livro_nome} "${item.livro_abreviado}" - ${item.capitulo}: ${item.versiculo}`}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index): any => index}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    viewCampoPesquisa: {
        flexDirection: "row",
        width: "95%",
        alignSelf: "center",
        height: "10%",
        justifyContent: "space-around",
        marginTop: "5%"
    },
    textInputCampoPesquisa: {
        width: "55%",
        backgroundColor: "#e5e5e5",
        fontSize: 21,
        borderRadius: 30,
    },
    textButton: {
        fontSize: 21
    },
    buttonPesquisar: {
        backgroundColor: "#03fa54",
        width: "40%",
        height: "100%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    viewConteudo: {
        height: "85%",
        width: "95%",
        alignSelf: "center",
        marginTop: "2%"
    },
    flatListRenderizaConteudo: {

    },
    buttonRenderizaConteudo: {
        padding: "5%",
        backgroundColor: "#e2e2e2",
        marginTop: "2%",
        borderRadius: 30

    },
    textRenderizaConteudo: {
        fontSize: 22,
        color: "black"
    },
    textRenderizaOrigem: {
        fontSize: 18
    }
})