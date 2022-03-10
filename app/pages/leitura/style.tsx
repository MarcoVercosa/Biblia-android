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
            flex: 1,
            backgroundColor: lightTheme,
        },
        viewHeader: {
            marginTop: "1%",
            height: "10%",
            justifyContent: "center",
            borderWidth: 3,
            borderColor: "#c7d5e8",
            borderRadius: 50,
            backgroundColor: "#c7d5e8"
        },
        leituraButton: {
            width: "100%",
            alignItems: "center",
        },
        viewHeaderImage: {
            width: "15%",
            height: "100%",
            marginLeft: "2%",
        },
        viewContainerLeitura: {
            height: "90%"
        },
        viewContainerLeituraInfo: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1%",
            marginBottom: "2%",
            width: "97%"

        },
        textContainerLeituraInfo: {
            fontSize: 18,
            fontWeight: "bold",
            color: fontColor

        },
        viewContainerLeituraVersiculos: {
            width: "93%",
            alignSelf: "center"

        },
        viewContainerArrows: {
            height: 160,
            width: "97%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#c7d5e8",
            borderRadius: 30,
            padding: "2%",
        },
        arrowsButton: {
            height: 120,
            width: "32%",
        },
        arrows: {
            height: 65,
            width: "50%",
            alignSelf: "center"
        },
        arrowsText: {
            textAlign: "center",
            fontSize: 17,
            color: fontColor
        },
        viewSelectCapitulo: {
            width: "35%",
            height: "10%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            textAlignVertical: "center",
        },
        selectCapitulo: {
            backgroundColor: "#afcfff",
            width: "100%",
            borderRadius: 30,
            height: "50%",
            fontSize: 25
        },
        viewCuriosidades: {
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            marginBottom: "3%"
        },
        tituloCuriosidades: {
            marginTop: "5%",
            fontSize: 25,
            color: fontColor
        },

    })

    return styles

}

export { Styles }