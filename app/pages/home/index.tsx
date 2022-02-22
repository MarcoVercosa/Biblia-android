import * as React from "react"
import { Image, SafeAreaView, View, StyleSheet, } from "react-native";
import ArticlesHome from "../../components/articlesHome";

export default function Home(): JSX.Element {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewImage}>
                <Image
                    source={require("../../assets/images/biblia_home.jpg")}
                    style={styles.viewImageImage}
                />
            </View>
            <ArticlesHome />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({

    safeContainer: {
        flex: 1,
    },
    viewImage: {
        height: "30%",
        marginTop: "2%",
        padding: "1%",
    },
    viewImageImage: {
        height: "100%",
        width: "100%",
        borderRadius: 30
    },
})