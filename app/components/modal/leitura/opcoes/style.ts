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
            //backgroundColor: "#e1e5f6",
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
        viewInputContainer: {
            marginTop: "5%"
        },
        viewInputImage: {

        },
        imageInput: {
            height: 55,
            width: 55,
            alignSelf: "center",
            marginTop: "5%"
        },
        viewInput: {
        },

        textInputAnotacao: {
            marginTop: "5%",
            width: "100%",
            backgroundColor: "white",
            fontSize: 21,
            borderRadius: 30,
            padding: 10
        },
        viewColors: {
            backgroundColor: "#edf3fc",
            width: "95%",
            alignSelf: "center",
            marginTop: "2.7%",
            borderRadius: 30
        },
        viewColorsTitulo: {
            fontSize: 25,
            padding: 10
        },

        viewColorsView: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "80%",

        },
        viewColorsSelect: {
            width: 40, height: 40,
            borderRadius: 150,
            margin: 10
        },
        view_botoes: {
            flexDirection: "row",
            height: 100,
            alignItems: "center",
            justifyContent: "space-around",
        },
        view_botoes_ambos: {
            width: "40%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            height: "55%",
            textAlignVertical: "center",
            borderRadius: 30,
            marginBottom: "17%",
            marginTop: "10%"
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