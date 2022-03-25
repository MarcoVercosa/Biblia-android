import React, { useContext } from "react"
import { View, StyleSheet, Image, Text, } from "react-native"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}
function Loading({ motivo }: any): JSX.Element {
    const { context }: IValues = useContext(Context) as any

    return (
        <View style={[styles.viewLoadingImage, { backgroundColor: context.lightTheme ? "#00fff2" : "#06060b" }]}>
            <Image
                source={require("../../assets/images/loading.gif")}
                style={styles.loadingImage}
            />
            <Text style={styles.motivo}>{motivo}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    viewLoadingImage: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#00fff2",
    },
    loadingImage: {
        alignSelf: "center",
        height: 60,
        width: 60
    },
    motivo: {
        width: "95%",
        marginTop: "20%",
        color: "#837870",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 25,
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 50,
        padding: 20
    }
})

export { Loading }