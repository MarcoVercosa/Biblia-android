import React, { useState, useContext, useEffect } from "react"
import { Image, SafeAreaView, View, Text, } from "react-native";
import ArticlesHome from "../../components/articlesHome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";
import { styles } from "./style"

interface IValues {
    context: IContext
    setContext: (value: any) => void
}

export default function Home(): JSX.Element {
    const { context, setContext }: IValues = useContext(Context) as any
    const [theme, setTheme] = useState<boolean>(context.lightTheme)

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.viewImage}>
                <Image
                    source={require("../../assets/images/biblia_home.jpg")}
                    style={styles.viewImageImage}
                />
            </View>
            <Text>{context.lightTheme ? "TRUE" : "FALSE"}</Text>

            <ArticlesHome />
        </SafeAreaView >
    )
}