import React, { useContext, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Context } from "../../routes";
import { ContextFavoritos } from '../../routes';
import { IContext, Ifavoritos } from "../../interface/IContext";
import { IContextAppFavoritos } from '../../interface/IContext';
import { IRetornoApiLeitura } from '../../interface/IRetornoApiLeitura';
import { IValoresArmazenados } from '../../interface/ImodalLeitura';
import ModalOpcoes from "../modal/leitura/opcoes"

interface IValues {
    context: IContext
}
interface IValues {
    contextFavoritos: IContextAppFavoritos;
    setContextFavoritos: (value: any) => void
}

interface IRenderizaVersiculos {
    navigation: any;
    dataParagrafo: any;
    index: number;
    versiculoPesquisa: number;
    dataNumeros: IValoresArmazenados;
    dataNomes: IRetornoApiLeitura;
}

function RenderizaVersiculos({ navigation, dataParagrafo, dataNumeros, index, versiculoPesquisa, dataNomes }: IRenderizaVersiculos): JSX.Element {
    const [modalOpcoes, setModalOpcoes] = useState<boolean>(false)
    const { context }: IValues = useContext(Context) as any
    const { contextFavoritos, setContextFavoritos }: IValues = useContext(ContextFavoritos) as any

    async function OpenCloseModalOpcoes() {
        setModalOpcoes(!modalOpcoes)
    }
    function DirecionaFavoritos() {
        navigation.navigate("Favoritos")
    }
    function ViewAnotacao(versao_id: number, livro_id: number, capituloAtual: number, index: number) {
        let data: Ifavoritos[] | any = contextFavoritos.VerificaSeHaFavoritos(versao_id, livro_id, capituloAtual, index)
        Alert.alert(
            "Anotação:",
            `${data[0].anotacao}`,
            [{
                text: "Ir Para favoritos",
                onPress: () => { DirecionaFavoritos() }
            },
            {
                text: "OK",
                onPress: () => {
                    return
                }
            }]
        )
    }
    return (
        <TouchableOpacity
            key={index}
            onLongPress={() => {
                OpenCloseModalOpcoes();
            }}
            delayLongPress={500}
            //se vier valor no versiculoPesquisa, é pq houve uma pesquisa por palavra
            style={{ backgroundColor: versiculoPesquisa == index + 1 ? "#cfafce" : "none", borderRadius: 30 }}
        >
            <Text key={index} style={[styles.textContainerLeituraVersiculos, { color: context.colorFont(), fontSize: context.fonteSizeLeituraBiblia, fontFamily: context.fontTipo }]}
            >
                {index + 1} - {dataParagrafo.conteudo}
            </Text>
            {contextFavoritos.VerificaSeHaFavoritos(dataNumeros.versao.versao_id, dataNumeros.livro.livro_id, dataNomes.capituloAtual, index + 1) &&
                <TouchableOpacity style={styles.imageButton}
                    onPress={() => { ViewAnotacao(dataNumeros.versao.versao_id, dataNumeros.livro.livro_id, dataNomes.capituloAtual, index + 1) }}
                >
                    <Image
                        source={require("../../assets/images/favoriteStar.jpg")}
                        style={styles.imageFavorito}
                    />
                </TouchableOpacity>
            }
            <ModalOpcoes modalOpcoes={modalOpcoes} OpenCloseModalOpcoes={OpenCloseModalOpcoes} versiculo={index + 1} dataParagrafo={dataParagrafo.conteudo} dataNumeros={dataNumeros} dataNomes={dataNomes} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textContainerLeituraVersiculos: {
        marginBottom: "0%",
        padding: 8,
    },
    buttontContainerLeitura: {

    },
    imageButton: {
        padding: "2%",
        alignItems: "center"
    },
    imageFavorito: {
        width: 50,
        height: 50

    }

})

export { RenderizaVersiculos }