import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Context } from "../../../../routes";
import { IContext } from "../../../../interface/IContext";

interface IValues {
    context: IContext
}
function Styles() {
    const { context }: IValues = useContext(Context) as any
    const styles = StyleSheet.create({
        viewContainer: {
            flex: 1,
            backgroundColor: context.lightThemeColor(),
        },
        viewImage: {
            height: "11%",
            width: "95%",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "2.7%",

        },
        imageButton: {

        },
        image: {
            height: 90,
            width: 90,
            alignSelf: "center"
        },
        viewContent: {
            backgroundColor: "#e1e5f6",
            width: "97%",
            padding: "5%",
            marginTop: "2%",
            borderRadius: 30,
            alignSelf: "center"
        },
        textContent: {
            fontSize: context.fonteSizeLeituraBiblia,
        },
        textVersaoLivro: {
            marginTop: "2%",
            fontSize: context.fonteSizeLeituraBiblia - 2,
            fontWeight: "bold"
        },
        textLivroCapituloVersiculo: {
            fontSize: context.fonteSizeLeituraBiblia - 2,
            fontWeight: "bold"
        },

        textInputAnotacao: {
            marginTop: "5%",
            width: "100%",
            backgroundColor: "white",
            fontSize: 21,
            borderRadius: 30,
            padding: 10
        },
        view_botoes: {
            height: "25%",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row"
        },
        view_botoes_ambos: {
            width: "40%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            height: "25%",
            borderRadius: 30,
        },
        view_botoes_Buscar: {
            backgroundColor: "#03fa54",
        },
        view_botoes_Cancelar: {
            backgroundColor: "#ff3f69",
        },
        view_botoes_text: {
            fontSize: 20,
            fontWeight: "bold"
        }

    })
    return styles
}

export { Styles }