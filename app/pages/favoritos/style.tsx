import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}

function Styles() {
    const { context }: IValues = useContext(Context) as any
    let fontColor = context.lightTheme ? "#747b81" : "#e5e5e5"
    let lightTheme = context.lightTheme ? "white" : "#13192a"

    const styles = StyleSheet.create({
        safeContainer: {
            backgroundColor: lightTheme
        },
        titulo: {
            backgroundColor: "#1dcab9",
            fontSize: 30,
            alignSelf: "center",
            textAlign: "center",
            textAlignVertical: "center",
            height: "8%",
            borderRadius: 20,
            width: "98%",
            marginTop: "2%",
            marginBottom: "5%",
            color: fontColor
        },
        viewSobre: {
            width: "95%",
            height: "87%",
            alignSelf: "center",
            backgroundColor: context.lightTheme ? "#fffaf2" : "#27272a",
            padding: "2%",
            borderRadius: 30
        },
        viewConteudo: {
            fontSize: 19,
            textAlign: "center",
            marginBottom: "3%",
            color: fontColor
        }
    })

    return styles

}

export { Styles }