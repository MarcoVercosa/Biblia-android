import React, { useContext, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";
import { IRetornoApiLeitura } from '../../interface/IRetornoApiLeitura';
import { IValoresArmazenados } from '../../interface/ImodalLeitura';
import ModalOpcoes from "../modal/leitura/opcoes"

interface IValues {
    context: IContext
}

interface IRenderizaVersiculos {
    dataParagrafo: any;
    index: number;
    versiculoPesquisa: number;
    dataNumeros: IValoresArmazenados,
    dataNomes: IRetornoApiLeitura
}

function RenderizaVersiculos({ dataParagrafo, dataNumeros, index, versiculoPesquisa, dataNomes }: IRenderizaVersiculos): JSX.Element {
    const [modalOpcoes, setModalOpcoes] = useState<boolean>(false)
    const { context }: IValues = useContext(Context) as any

    async function OpenCloseModalOpcoes() {
        setModalOpcoes(!modalOpcoes)
    }

    return (

        <TouchableOpacity
            key={index}
            onLongPress={() => {
                OpenCloseModalOpcoes();
            }}
            //se vier valor no versiculoPesquisa, é pq houve uma pesquisa por palavra
            style={{ backgroundColor: versiculoPesquisa == index + 1 ? "#cfafce" : "none", borderRadius: 30 }}
        >
            <Text key={index} style={[styles.textContainerLeituraVersiculos, { color: context.colorFont(), fontSize: context.fonteSizeLeituraBiblia }]}
            >
                {index + 1} - {dataParagrafo.conteudo}
            </Text>
            <ModalOpcoes modalOpcoes={modalOpcoes} OpenCloseModalOpcoes={OpenCloseModalOpcoes} dataParagrafo={dataParagrafo.conteudo} dataNumeros={dataNumeros} dataNomes={dataNomes} />
        </TouchableOpacity>



    )
}

const styles = StyleSheet.create({
    textContainerLeituraVersiculos: {
        marginBottom: "0%",
        fontFamily: "Open Sans",
        padding: 8
    },
    buttontContainerLeitura: {

    },

})

export { RenderizaVersiculos }