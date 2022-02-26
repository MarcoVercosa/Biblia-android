import React, { useState, useRef } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { GetApi } from "../../api";
import { ModalHino } from "../../components/modal/hino";

export default function Harpa(): JSX.Element {
    const [modalHinoSelect, setModalHinoSelect] = useState<boolean>(false)


    function OpenCloseModalHino(DataFecth?: any) {
        setModalHinoSelect(!modalHinoSelect)
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewHeader}>
                <TouchableOpacity style={styles.modalPesquisaHino}
                    onPressOut={() => OpenCloseModalHino(false)}
                >
                    <Image
                        source={require("../../assets/images/music.jpg")}
                        style={styles.viewHinoModalImage}
                    />
                </TouchableOpacity>
                <ModalHino modalHinoSelect={modalHinoSelect} OpenCloseModalHino={OpenCloseModalHino} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#e2e2e2",
    },
    viewHeader: {
        height: "10%",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#c7d5e8",
        borderRadius: 50,
        backgroundColor: "#c7d5e8",
        marginTop: "0.7%"
    },
    modalPesquisaHino: {
        alignItems: "center",
        marginTop: "1%",
    },
    viewHinoModalImage: {
        width: "15%",
        height: "100%",
        marginLeft: "2%",
    }


})