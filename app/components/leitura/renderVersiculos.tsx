import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}

interface IRenderizaVersiculos {
    data: any, index: number, versiculoPesquisa: number
}

function RenderizaVersiculos({ data, index, versiculoPesquisa }: IRenderizaVersiculos): JSX.Element {
    const { context }: IValues = useContext(Context) as any
    return (
        <TouchableOpacity
            //se vier valor no versiculoPesquisa, é pq houve uma pesquisa por palavra
            style={{ backgroundColor: versiculoPesquisa == index + 1 ? "#cfafce" : "none", borderRadius: 30 }}
        >
            <Text key={index} style={[styles.textContainerLeituraVersiculos, { color: context.colorFont(), fontSize: context.fonteSizeLeituraBiblia }]}
            >
                {index + 1} - {data.conteudo}
            </Text>
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