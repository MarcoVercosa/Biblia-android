import React, { useContext } from "react"
import { StyleSheet } from "react-native"

function Styles() {

    const styles = StyleSheet.create({
        viewContainer: {
            flex: 1
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

        },
        textContent: {

        },
        textDadosLivro: {

        },
        textInputAnotacao: {

        }

    })
    return styles
}

export { Styles }