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
            height: 125,
            marginTop: "3%",
            justifyContent: "center",
            borderBottomColor: "#e2dfed",
            borderBottomWidth: 2,


        },
        viewImageThemeHeader: {

        },
        imageHeader: {
            height: 50,
            width: 50,
            alignSelf: "flex-start",
            marginBottom: "6%",
            marginLeft: "2%",
        },
        viewOptionTemaOptions: {
            flexDirection: "row",
            marginBottom: "2%",

        },

        viewOptionTemaText: {
            fontSize: 25,
            marginLeft: "2%",
            marginRight: "5%",
            color: fontColor,
            width: "50%",
        },
        viewOptionFonteSizeOptionsPicker: {
            width: "25%",
            backgroundColor: "#e5e5e5",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            textAlignVertical: "center"

        },
        viewOptionTemaButtontSobre: {
            width: "30%",
        },
        viewOptionTemaTextSobre: {
            fontSize: 25,
            color: fontColor,
            justifyContent: "center",
            backgroundColor: "#3fc2ff",
            marginLeft: "0%",
            marginRight: "0%",
            marginBottom: "2%",
            padding: "4%",
            borderRadius: 10,
            width: "100%",
            textAlign: "center",
        }
    })

    return styles
}
export { Styles }