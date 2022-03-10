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
    let fontSize = context.fonteSizeHino

    const styles = StyleSheet.create({
        safeContainer: {
            flex: 1,
            backgroundColor: lightTheme
        },
        viewHeader: {
            height: "10%",
            justifyContent: "center",
            borderWidth: 3,
            borderColor: "#c7d5e8",
            borderRadius: 50,
            backgroundColor: "#c7d5e8",
            marginTop: "0.7%"
        },
        modalPesquisaHino: {
            alignItems: "center",
            marginTop: "1%",
        },
        viewHinoModalImage: {
            width: "15%",
            height: "100%",
            marginLeft: "2%",
        },
        viewLetraHino: {
            height: "89.0%",
            width: "95%",
            alignSelf: "center",

        },
        tituloLetraHino: {
            fontSize: fontSize + 10,
            textAlign: "center",
            marginTop: "5%",
            marginBottom: "2%",
            //height: "14%",
            color: fontColor
        },
        conteudoLetraHinoButtonShare: {
            height: "8%",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
        },
        conteudoLetraHinoImageShare: {
            height: 40,
            width: 40,
        },
        renderizaConteudos: {
            width: "95%"
        },
        conteudoLetraHino: {
            width: "100%",
            textAlign: "center",
            fontSize: fontSize,
            color: fontColor
        },

    })
    return styles
}

export { Styles }