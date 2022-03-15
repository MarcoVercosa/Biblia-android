import React, { useContext } from "react"
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { Styles } from "./style"

export default function Sobre(): JSX.Element {

    let styles = Styles()

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewContainer}>
                <View style={styles.viewImage}>
                    <TouchableOpacity style={styles.imageButton}
                    //onPressOut={ }
                    >
                        <Image
                            source={require("../../assets/images/favoritos.jpg")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
