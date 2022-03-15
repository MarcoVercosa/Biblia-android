import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Context } from "../../../routes";
import { IContext } from "../../../interface/IContext";

interface IValues {
    context: IContext
}

function Styles() {
    const { context }: IValues = useContext(Context) as any
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: context.lightThemeColor()
        },
        view_titulo: {
            backgroundColor: "#08a0ff",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
        },
        view_titulo_text: {
            fontSize: 23,
            textAlign: "center",
            fontWeight: "bold",
            color: context.colorFont()
        },
        view_selects: {
            height: "65%",
            width: "95%",
            alignSelf: "center"
        },
        view_selects_text: {
            fontSize: 20,
            marginTop: "7%",
            textAlign: "center",
            marginBottom: "2%",
            fontWeight: "bold",
            color: context.colorFont()
        },
        picker: {
            backgroundColor: "#e5e5e5",
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