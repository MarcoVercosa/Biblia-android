import React, { useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert } from "react-native"
import { GetApi } from "../../api"
import Loading from "../../components/loading/index"
import { IResultadoAPI, IFlatListConteudo } from "../../interface/IRetornoApiPesquisa"
import { styles } from "./style"

export default function Pesquisa({ navigation }: any): JSX.Element {
    const [palavraDigitada, setPalavraDigitada] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [dataApi, setDataApi] = useState<Array<IResultadoAPI>>()

    async function BuscarPesquisa() {
        if (palavraDigitada.length < 3 || palavraDigitada.length > 20) {
            Alert.alert("Digite ao menos 2 letras ou no máximo 20 letras")
            return
        }
        setLoading(true)
        let { data }: any = await GetApi(`mais/pesquisa/${palavraDigitada}`)
        if (data.length < 1) { Alert.alert("Não foi encontrado nada relacionado a palavra " + palavraDigitada) }
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
                        renderItem={({ item }: IFlatListConteudo) => {
                            return (
                                <TouchableOpacity style={styles.buttonRenderizaConteudo}
                                    onPress={() => { DirecionaParaLeitura(item.livro_nome, item.versao_id, item.livro_testamento_id, item.livro_id, item.capitulo, item.versiculo) }}
                                >
                                    <Text style={styles.textRenderizaConteudo}>{item.conteudo}</Text>
                                    <Text style={styles.textRenderizaOrigem}>{`${item.livro_nome} "${item.livro_abreviado}" - ${item.capitulo}: ${item.versiculo}`}</Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(_, index): any => index}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
