import * as React from "react"
import { Image, SafeAreaView, View, StyleSheet, } from "react-native";
import ArticlesHome from "../../components/articlesHome";
import { styles } from "./style"

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