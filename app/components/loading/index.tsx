import React, { useContext } from "react"
import { View, StyleSheet, Image, } from "react-native"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
}
export default function Loading(): JSX.Element {
    const { context }: IValues = useContext(Context) as any

    return (
        <View style={[styles.viewLoadingImage, { backgroundColor: context.lightTheme ? "#00fff2" : "#06060b" }]}>
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
        backgroundColor: "#00fff2",
    },
    loadingImage: {
        alignSelf: "center",
        height: 60,
        width: 60
    },
})