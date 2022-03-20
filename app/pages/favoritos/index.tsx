import React, { useContext, useState, useEffect } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Alert } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard';
import { ContextFavoritos } from "../../routes"
import { IContextAppFavoritos } from "../../interface/IContext"
import { Ifavoritos } from "../../interface/IContext"
import { Styles } from "./style"
import { contextAppFavoritos } from "../../components/contextAPI/contextAppFavoritos"

interface IValues {
    contextFavoritos: IContextAppFavoritos;
    setContextFavoritos: (value: any) => void
}

export default function Favoritos({ navigation }: any): JSX.Element {
    const { contextFavoritos, setContextFavoritos }: IValues = useContext(ContextFavoritos) as any
    let styles = Styles()

    useEffect(() => {
        const CarregaDadosLocalStorage = async () => {
            let dados = await contextAppFavoritos.CarregarDados()
            if (dados) {
                console.log(dados)
                setContextFavoritos(dados)
            }
        }
        CarregaDadosLocalStorage()
    }, [])

    function DirecionaParaLeitura(livro_nome: string, versao_id: number, livro_testamento_id: number, livro_id: number, capitulo: number, versiculo: number) {
        navigation.navigate("Leitura", { livro_nome, versao_id, livro_testamento_id, livro_id, capitulo, versiculo })
    }
    function Copiar(value: string) {
        Alert.alert("Texto copiado !")
        return Clipboard.setString(value)
    }

    function ExluirFavoritos(versao_id: number, livro_id: number, capitulo: number, versiculo: number) {
        Alert.alert(
            "Apagar",
            "Deseja apagar esse versículo ?",
            [{
                text: "Cancelar",
                onPress: () => { return }
            },
            {
                text: "Confirmar",
                onPress: () => {
                    let retorno = contextFavoritos.ExcluirDados(versao_id, livro_id, capitulo, versiculo)
                    setContextFavoritos(retorno)
                }
            }]
        )
    }
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewContainer}>
                <View style={styles.viewImage}>
                    <TouchableOpacity style={styles.imageButton}>
                        <Image
                            source={require("../../assets/images/favoritos.jpg")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>


                <ScrollView>
                    {contextFavoritos.favoritos.map((data: Ifavoritos, index: number) => {
                        return (
                            <View style={[styles.viewContent, { backgroundColor: data.color }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        DirecionaParaLeitura(data.versaoNome, data.dadosUrlApi.versao_id,
                                            data.dadosUrlApi.livro_testamento_id, data.dadosUrlApi.livro_id,
                                            data.capitulo, data.versiculo
                                        )
                                    }}
                                >
                                    <Text style={styles.textContent}>{data.conteudo}</Text>
                                    <Text style={styles.textVersaoLivro}>{data.versaoNome}</Text>
                                    <Text style={styles.textLivroCapituloVersiculo}>{data.livroNome}: {data.capitulo} - {data.versiculo}</Text>
                                    <TextInput
                                        style={styles.textInputAnotacao}
                                        //onChangeText={(value: string) => setAnotacao(value)}
                                        value={data.anotacao}
                                        placeholder="Anotação"
                                        maxLength={200}
                                        multiline
                                    />
                                </TouchableOpacity>
                                <View style={styles.viewImagesOptions}>
                                    <Image
                                        source={require("../../assets/images/share.jpg")}
                                        style={styles.imagesOptions}
                                    />
                                    <TouchableOpacity
                                        onPress={() => Copiar(`${data.livroNome}: ${data.capitulo} - ${data.versiculo} => ${data.conteudo}`)}
                                    >
                                        <Image
                                            source={require("../../assets/images/copy.jpg")}
                                            style={styles.imagesOptions}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => ExluirFavoritos(data.dadosUrlApi.versao_id,
                                            data.dadosUrlApi.livro_id, data.capitulo, data.versiculo)
                                        }
                                    >
                                        <Image

                                            source={require("../../assets/images/trash.jpg")}
                                            style={styles.imagesOptions}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}
