import React, { useContext, useEffect, useState } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Alert, Share } from "react-native"
import ModalEditFavorito from "../../components/modal/favoritos"
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
    const [modalEdit, setModalEdit] = useState<boolean>(false)
    const [indexFavoritoContext, setIndexFavoritoContext] = useState<number | any>(undefined)
    let styles = Styles()

    useEffect(() => {//se houver dados no localstorage, carregue do Context
        const CarregaDadosLocalStorage = async () => {
            let dados = await contextAppFavoritos.CarregarDados()
            if (dados) {
                setContextFavoritos(dados)
            }
        }
        CarregaDadosLocalStorage()
    }, [])

    function DirecionaParaLeitura(livro_nome: string, versao_id: number, livro_testamento_id: number, livro_id: number, capitulo: number, versiculo: number) {
        console.log(livro_nome, versao_id, livro_testamento_id, livro_id, capitulo, versiculo)
        navigation.navigate("Leitura", { livro_nome, versao_id, livro_testamento_id, livro_id, capitulo, versiculo })
    }
    function Copiar(value: string) {
        Alert.alert("Texto copiado !")
        return Clipboard.setString(value)
    }
    function Compartilhar(versao_id: number, testamento_id: number, livro_id: number, capitulo: number, versiculo: number, livro_nome: string) {
        Share.share({
            message: `http://vidadafonte.com.br/biblia/painelleitura/${versao_id}/${testamento_id}/${livro_id}/${capitulo}/${versiculo}#${versiculo} \n
            ${livro_nome}:${capitulo} - ${versiculo}`,
            title: `${livro_nome}:${capitulo} - ${versiculo}`,
        })
    }
    function ModalEditarFavorito(value: boolean) {
        setModalEdit(value)
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
                <ModalEditFavorito index={indexFavoritoContext} modalEdit={modalEdit} OpenCloseModaEdit={ModalEditarFavorito} />
                <ScrollView>
                    {contextFavoritos.favoritos.map((data: Ifavoritos, index: number) => {
                        return (
                            <View style={[styles.viewContent, { backgroundColor: data.color }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        DirecionaParaLeitura(data.livroNome, data.dadosUrlApi.versao_id,
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
                                        editable={false}
                                    />
                                </TouchableOpacity>
                                <View style={styles.viewImagesOptions}>
                                    <TouchableOpacity
                                        onPress={() => { Compartilhar(data.dadosUrlApi.versao_id, data.dadosUrlApi.livro_testamento_id, data.dadosUrlApi.livro_id, data.capitulo, data.versiculo, data.livroNome) }}
                                    >
                                        <Image
                                            source={require("../../assets/images/share.jpg")}
                                            style={styles.imagesOptions}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => Copiar(`${data.livroNome}: ${data.capitulo} - ${data.versiculo} => ${data.conteudo}`)}
                                    >
                                        <Image
                                            source={require("../../assets/images/copy.jpg")}
                                            style={styles.imagesOptions}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIndexFavoritoContext(index)
                                            ModalEditarFavorito(true)
                                        }}
                                    >
                                        <Image

                                            source={require("../../assets/images/pencil.jpg")}
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
