import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

interface IRenderizaVersiculos {
    data: any, index: number, versiculoPesquisa: number
}

function RenderizaVersiculos({ data, index, versiculoPesquisa }: IRenderizaVersiculos): JSX.Element {
    return (
        <TouchableOpacity
            style={{ backgroundColor: versiculoPesquisa == index + 1 ? "#6ef1d8" : "none", borderRadius: 30 }}
        >
            <Text key={index} style={styles.textContainerLeituraVersiculos}
            >
                {index + 1} - {data.conteudo}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textContainerLeituraVersiculos: {
        marginBottom: "5%",
        fontFamily: "Open Sans",
        fontSize: 20,
        color: "black",
        padding: 8
    },
    buttontContainerLeitura: {

    },

})

export { RenderizaVersiculos }