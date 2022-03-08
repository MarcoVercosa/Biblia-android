import React, { useState, useContext } from "react"
import { View, Text, Image, SafeAreaView, Switch } from "react-native"
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { styles } from "./style"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
    setContext: (value: any) => void
}

export default function Configuracao(): JSX.Element {
    const { context, setContext }: IValues = useContext(Context) as any
    // const [lightThemeState, setLightThemeState] = useState<boolean>(context.lightTheme)
    // const [fontSizeState, setFontSizeState] = useState<number>(context.fonte)
    // const [keepScreenOnState, setKeepScreenOnState] = useState<boolean>(context.keepScreenOn)

    async function ChangeTheme(checked: boolean) {
        setLightThemeState(checked)
        setContext((prevState: any) => { return { ...prevState, lightTheme: checked } })
        await AsyncStorage.setItem("lightTheme", JSON.stringify(checked))
        console.log(context)
    }
    async function ChangeOnOffScreen(checked: boolean) {
        setKeepScreenOnState(checked);
        setContext((prevState: any) => { return { ...prevState, keepScreenOn: checked } })
        //await AsyncStorage.setItem("ChangeOnOffScreen", JSON.stringify(checked))
        console.log(context)
    }
    function ChangeFontSize(value: number) {
        setFontSizeState(value)
        setContext((prevState: any) => { return { ...prevState, fonte: value } })
        console.log(context)
    }

    function GerarNumerosFontSize() {
        let armazena = []
        for (let i = 10; i <= 40; i++) {
            armazena.push(<Picker.Item key={i} label={String(i)} value={i} />)
        }
        return armazena
    }



    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.viewOptionTema}>
                    <View style={styles.viewImageThemeHeader}>
                        <Image
                            source={require("../../assets/images/theme.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={styles.viewOptionTemaOptions}>
                        <Text style={styles.viewOptionTemaText}>Tema LIGHT: </Text>
                        <Switch
                            thumbColor={context.lightTheme ? "#00f689" : "#f4f3f4"}
                            onValueChange={(value) => {
                                ChangeTheme(value)
                            }}
                            value={context.lightTheme}
                            style={{ transform: [{ scaleX: 1.9 }, { scaleY: 2 }] }}
                        />
                    </View>
                </View>
                <View style={styles.viewOptionFontSize}>

                    <View style={styles.viewOptionFontSizeImage} >
                        <Image
                            source={require("../../assets/images/fontSize.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={styles.viewOptionFonteSizeOptions}>
                        <Text style={styles.viewOptionFonteSizeText}>Fonte: </Text>
                        <Picker
                            style={styles.viewOptionFonteSizeOptionsPicker}
                            selectedValue={context.fonte}
                            onValueChange={(value: number) => { ChangeFontSize(value) }}
                            mode="dropdown"
                        >
                            {GerarNumerosFontSize()}
                        </Picker>
                    </View>
                </View>
                <View style={styles.viewOptionTelaLigada}>

                    <View style={styles.viewOptionTelaLigadaImage} >
                        <Image
                            source={require("../../assets/images/light.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>

                    <View style={styles.viewOptionTelaLigadaOptions}>
                        <Text style={styles.viewOptionTelaLigadaText}>Tela ligada durante leitura: </Text>
                        <Switch
                            thumbColor={context.keepScreenOn ? "#00f689" : "#f4f3f4"}
                            onValueChange={(value) => {
                                ChangeOnOffScreen(value)
                            }}
                            value={context.keepScreenOn}
                            style={{ transform: [{ scaleX: 1.9 }, { scaleY: 2 }] }}
                        />

                    </View>
                </View>
            </View>
        </SafeAreaView >
    )
}


