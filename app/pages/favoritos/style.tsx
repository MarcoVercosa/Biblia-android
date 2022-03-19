import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}
function Styles() {
    const { context }: IValues = useContext(Context) as any
    const styles = StyleSheet.create({
        safeContainer: {
            backgroundColor: context.lightThemeColor(),
            flex: 1
        },
        viewContainer: {
            flex: 1,
        },
        viewImage: {
            height: "11%",
            width: "95%",
            // backgroundColor: "blue",
            // borderRadius: 10,
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "0.7%"
        },
        imageButton: {

        },
        image: {
            height: 90,
            width: 90,
            alignSelf: "center"
        },
        viewContent: {
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

    })

    return styles

}

export { Styles }