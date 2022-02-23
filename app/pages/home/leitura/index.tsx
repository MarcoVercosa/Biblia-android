import React, { useState } from "react"
import { View, Text, Modal, SafeAreaView, StyleSheet, Image, TouchableOpacity } from "react-native"
import ModalLeitura from "../../../components/modal/leitura"


export default function Leitura(): JSX.Element {

    const [modalLeitura, setModalLeitura] = useState<boolean>(false)

    function OpenCloseModalLeitura(dadosSelecionadosModal?: []) {
        setModalLeitura(!modalLeitura)
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={styles.leituraButton}
                    onPressOut={OpenCloseModalLeitura}
                >
                    <Image
                        source={require("../../../assets/images/find_book.jpg")}
                        style={styles.viewHeaderImage}
                    />
                </TouchableOpacity>
                <ModalLeitura modalLeitura={modalLeitura} OpenCloseModalLeitura={OpenCloseModalLeitura} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1
    },
    viewHeader: {
        height: "10%",
        justifyContent: "center",
    },
    leituraButton: {
        width: "100%",
        alignItems: "center",
    },
    viewHeaderImage: {
        width: "15%",
        height: "100%",
        marginLeft: "2%",
    }

})