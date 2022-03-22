import { Picker } from '@react-native-picker/picker';
import React from "react"

function GerarNumerosFontSize() {
    let armazena = []
    for (let i = 10; i <= 40; i++) {
        armazena.push(<Picker.Item key={i} label={String(i)} value={i} />)
    }
    return armazena
}

function GerarFontTipo() {
    let fontsValue = [
        "Hurricane-Regular",
        "Lobster-Regular",
        "Montserrat-Regular",
        "Oswald-Regular",
        "Pacifico-Regular",
        "Ramaraja-Regular",
        "Roboto-Regular",
        "Satisfy-Regular",
        "SecularOne-Regular",
        "ShadowsIntoLight-Regular",
        "Smokum-Regular",
        "StintUltraCondensed-Regular",
        "Ubuntu-Regular"
    ]
    let fontLabel = fontsValue.map((value: string) => value.replace("-Regular", ""))
    let armazena: any = fontsValue.map((value: String, index: number) =>
        <Picker.Item key={index} label={fontLabel[index]} value={value} />
    )
    return armazena
}

export { GerarNumerosFontSize, GerarFontTipo }