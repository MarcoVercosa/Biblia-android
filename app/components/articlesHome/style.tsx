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
    const styles = StyleSheet.create({
        viewArticles: {
            alignItems: "center",
        },
        viewArticlesImage1: {
            height: 125,
            width: "30%",
            marginTop: "7%",
            marginBottom: "3%",
        },
        viewArticlesTextHead: {
            fontSize: 27,
            color: fontColor,
            marginBottom: "5%",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
            alignSelf: "center",

        },
        viewArticlesText: {
            color: fontColor,
            fontSize: 17,
            padding: "1.56%",
            textAlign: "center",
        }
    })

    return styles
}

export { Styles }