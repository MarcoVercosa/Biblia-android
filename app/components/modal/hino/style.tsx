import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Context } from "../../../routes";
import { IContext } from "../../../interface/IContext";

interface IValues {
    context: IContext
}

function Styles() {
    const { context }: IValues = useContext(Context) as any
    let fontColor = context.lightTheme ? "#747b81" : "#e5e5e5"
    let lightTheme = context.lightTheme ? "white" : "#13192a"

    const styles = StyleSheet.create({

        viewContainer: {
            backgroundColor: lightTheme,
            flex: 1
        },
        viewHeader: {
            flexDirection: "row",
            height: "12%",
            width: "95%",
            justifyContent: "space-between",
            paddingTop: "1%"
        },
        botaoSair: {
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: "100%",
            borderRadius: 30,
        },
        viewHeaderImage: {
            height: "80%",
            width: "70%",
        },

        titulo: {
            fontSize: 28,
            textAlign: "center",
            textAlignVertical: "center",
            backgroundColor: "#08a0ff",
            height: "100%",
            width: "80%",
            borderRadius: 30
        },
        viewBuscaPorNumero: {
            marginTop: "5%",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",

        },
        textSelectNumeroHino: {
            fontSize: 25,
            width: "45%",
            color: fontColor
        },
        selectNumeroHino: {
            width: "45%",
            backgroundColor: "#e5e5e5",
        },
        viewBuscaPorPalavra: {
            marginTop: "2.5%",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        },
        textBuscaPorPalavraHino: {
            fontSize: 25,
            width: "45%",
            color: fontColor
        },
        inputBuscaPorPalavraHino: {
            width: "45%",
            backgroundColor: "#e5e5e5",
            fontSize: 21,
        },
        viewRenderizaHinos: {
            justifyContent: "space-around",
            alignItems: "center",
            height: "58%",

        },
        renderizaHinos: {
            justifyContent: "space-around",

        },
        botaoBuscaPorPalavraHino: {
            backgroundColor: "#03fa54",
            marginTop: "1.5%",
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: "8%",
            borderRadius: 30,
        },
        view_botoes_text: {
            fontSize: 20,
            fontWeight: "bold"
        }
    })
    return styles
}

export { Styles }