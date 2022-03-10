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
        SafeAreaView: {
            flex: 1,
        },
        container: {
            height: "100%",
            width: "100%",
            backgroundColor: lightTheme
        },
        viewOptionTema: {
            //: "23%",
            marginTop: "3%",
            justifyContent: "center",
            borderBottomColor: "#e2dfed",
            borderBottomWidth: 2,
        },
        viewImageThemeHeader: {
            //height: "75%"
        },
        viewOptionTemaOptions: {
            flexDirection: "row",
            marginBottom: "4%",
        },
        imageHeader: {
            height: 50,
            width: 50,
            alignSelf: "center",
            marginBottom: "10%"

        },
        viewOptionTemaText: {
            fontSize: 25,
            marginLeft: "2%",
            marginRight: "5%",
            color: fontColor
        },
        viewOptionFontSize: {
            //height: "23%",
            justifyContent: "center",
            marginTop: "3%",
            borderBottomColor: "#e2dfed",
            borderBottomWidth: 2,
        },
        viewOptionFontSizeImage: {
            //height: "60%"
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
            //height: "23%",

            justifyContent: "center",
            marginTop: "3%",
            borderBottomColor: "#e2dfed",
            borderBottomWidth: 2,

        },
        viewOptionTelaLigadaImage: {

        },
        viewOptionTelaLigadaOptions: {
            flexDirection: "row",
            marginBottom: "4%",
            backgroundColor: "red"
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