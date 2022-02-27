import React from "react"
import { View, StyleSheet, Image, } from "react-native"

export default function Loading(): JSX.Element {
    return (
        <View style={styles.viewLoadingImage}>
            <Image
                source={require("../../assets/images/loading.gif")}
                style={styles.loadingImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewLoadingImage: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#00fff2"
    },

    loadingImage: {
        alignSelf: "center",
    },
})