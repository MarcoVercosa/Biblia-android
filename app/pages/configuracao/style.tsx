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
        container: {
            height: "100%",
            width: "100%",
            backgroundColor: lightTheme
        },
        viewOptionTema: {
            height: "23%",
            marginTop: "3%",
            justifyContent: "center",
            borderBottomColor: "#8a8477",
            borderBottomWidth: 2,
        },
        viewImageThemeHeader: {
            height: "75%"
        },
        viewOptionTemaOptions: {
            flexDirection: "row",
            marginBottom: "4%"
        },
        imageHeader: {
            height: "85%",
            width: "20%",
            alignSelf: "flex-end",
            marginRight: "5%"

        },
        viewOptionTemaText: {
            fontSize: 25,
            marginLeft: "2%",
            marginRight: "5%",
            color: fontColor
        },
        viewOptionFontSize: {
            height: "23%",
            justifyContent: "center",
            marginTop: "3%",
            borderBottomColor: "#8a8477",
            borderBottomWidth: 2,
        },
        viewOptionFontSizeImage: {
            height: "60%"
        },
        viewOptionFonteSizeOptions: {
            flexDirection: "row",
            marginBottom: "2%"

        },
        viewOptionFonteSizeText: {
            marginLeft: "2%",
            marginRight: "8%",
            marginTop: "4.5%",
            fontSize: 25,
            color: fontColor
        },
        viewOptionFonteSizeOptionsPicker: {
            width: "30%",
            backgroundColor: "#e5e5e5",
        },


        viewOptionTelaLigada: {
            height: "23%",
            //width: "95%",
            justifyContent: "center",
            marginTop: "3%",
            borderBottomColor: "#8a8477",
            borderBottomWidth: 2,

        },
        viewOptionTelaLigadaImage: {
            height: "70%",
            alignContent: "center",
            alignItems: "center",
            textAlign: "center",
            textAlignVertical: "center",
            justifyContent: "center",
        },
        viewOptionTelaLigadaOptions: {
            flexDirection: "row",
            marginBottom: "4%"
        },
        viewOptionTelaLigadaText: {
            width: "50%",
            fontSize: 25,
            marginBottom: "2%",
            marginLeft: "2%",
            color: fontColor

        },

    })

    return styles
}
export { Styles }