import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"
import { IResutadoPorPalavra } from "../../../interface/IResultadoPorPalavra"

export default function RenderizaHinoPorPalavra({ item }: { item: IResutadoPorPalavra }) {
    return (
        <TouchableOpacity
        //style={styles.botaoBuscaPorPalavraHino}
        >
            <Text>
                {item.numero}
            </Text>
            <Text>
                {item.titulo}
            </Text>
        </TouchableOpacity>
    )
}