import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

function RenderizaVersiculos({ data, index }: { data: any, index: number }): JSX.Element {
    console.log(data)
    console.log(index)
    return (
        <TouchableOpacity>
            <Text key={index} style={styles.textContainerLeituraVersiculos}>
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
    }
})

export { RenderizaVersiculos }