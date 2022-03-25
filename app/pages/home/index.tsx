import React, { useState, useContext, useEffect } from "react"
import { Image, SafeAreaView, View, Text, } from "react-native";
import ArticlesHome from "../../components/articlesHome";
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";
import { styles } from "./style"

interface IValues {
    context: IContext
}

export default function Home(): JSX.Element {
    const { context }: IValues = useContext(Context) as any
    let lightTheme = context.lightTheme ? "white" : "#13192a"

    return (
        <SafeAreaView style={[styles.safeContainer, { backgroundColor: lightTheme }]}>
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