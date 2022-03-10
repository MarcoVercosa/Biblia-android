import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}

function RenderizaCuriosidades({ data }: any): JSX.Element {
    const { context }: IValues = useContext(Context) as any
    let fontColor = context.lightTheme ? "#747b81" : "#e5e5e5"
    let lightThemeContent = context.lightTheme ? "#c7d5e8" : "#27272a"
    let fontSize = context.fonteSizeLeituraBiblia

    return (
        <TouchableOpacity style={[styles.touchableOpacityCuriosidades, { backgroundColor: lightThemeContent }]}>
            <Text style={{ color: fontColor, fontSize: fontSize }}>
                {data.conteudo}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableOpacityCuriosidades: {
        marginTop: "3%",
        padding: "5%",
        width: "93%",
        borderRadius: 30,
    },

})

export { RenderizaCuriosidades }