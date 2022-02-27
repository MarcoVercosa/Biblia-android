import React from "react"
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { IResutadoPorPalavra } from "../../../interface/IResultadoPorPalavra"

interface IRenderizaHinoPorPalavra {
    item: IResutadoPorPalavra;
    index: number;
    OpenCloseModalHino: (numeroHino: boolean | Number) => void
}

export default function RenderizaHinoPorPalavra({ item, index, OpenCloseModalHino }: IRenderizaHinoPorPalavra) {
    return (
        <TouchableOpacity
            style={styles.renderizaPorPalavra}
            key={index}
            onPressOut={() => OpenCloseModalHino(item.numero)}
        >
            <Text style={styles.numeroRenderizaPorPalavra}>
                {item.numero}
            </Text>
            <Image
                source={require("../../../assets/images/notaMusical.jpg")}
                style={styles.imagemNotaMusical}
            >

            </Image>
            <Text style={styles.textRenderizaPorPalavra}>
                {item.titulo}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    renderizaPorPalavra: {
        width: "48.6%",
        marginTop: "1%",
        marginLeft: "1%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00e3ab",
        padding: "3%",
        borderRadius: 30

    },
    numeroRenderizaPorPalavra: {
        fontSize: 20,
        fontWeight: "bold"
    },
    textRenderizaPorPalavra: {
        fontSize: 16.5
    },
    imagemNotaMusical: {
        width: 50,
        height: 60
    }

})