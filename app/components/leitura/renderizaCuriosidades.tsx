import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

function RenderizaCuriosidades({ data }: any): JSX.Element {

    return (
        <TouchableOpacity style={styles.touchableOpacityCuriosidades}>
            <Text style={styles.textCuriosidades}>
                {data.conteudo}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    touchableOpacityCuriosidades: {
        backgroundColor: "#c7d5e8",
        marginTop: "3%",
        padding: "5%",
        width: "93%",
        borderRadius: 30,


    },
    textCuriosidades: {
        fontSize: 20
    }

})

export { RenderizaCuriosidades }