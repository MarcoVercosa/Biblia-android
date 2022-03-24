import React, { useContext } from "react"
import { StyleSheet } from "react-native"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}

function Styles() {
    const { context }: IValues = useContext(Context) as any
    context.fonteSizeLeituraBiblia

    const styles = StyleSheet.create({
        container: {
            height: "100%",
            backgroundColor: context.lightThemeColor()
        },
        viewCampoPesquisa: {
            flexDirection: "row",
            width: "95%",
            alignSelf: "center",
            height: "13%",
            justifyContent: "space-around",
            marginTop: "5%"
        },
        textInputCampoPesquisa: {
            width: "55%",
            backgroundColor: "#e2e2e2",
            fontSize: 21,
            borderRadius: 30,
            padding: 10
        },
        textButton: {
            fontSize: 21
        },
        buttonPesquisar: {
            backgroundColor: "#03fa54",
            width: "40%",
            height: "100%",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
        },
        viewConteudo: {
            height: "82%",
            width: "95%",
            alignSelf: "center",
            marginTop: "2%",
        },
        flatListRenderizaConteudo: {

        },
        buttonRenderizaConteudo: {
            padding: "5%",
            backgroundColor: "#e1e5f6",
            marginTop: "2%",
            borderRadius: 30

        },
        textRenderizaConteudo: {
            fontSize: context.fonteSizeLeituraBiblia,
            color: "black",
            fontFamily: context.fontTipo

        },
        textRenderizaOrigem: {
            fontSize: context.fonteSizeLeituraBiblia,
            fontFamily: context.fontTipo
        }
    })
    return styles

}

export { Styles }