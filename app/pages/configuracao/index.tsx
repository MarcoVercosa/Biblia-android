import React, { useContext, useState } from "react"
import { View, Text, Image, Switch, ScrollView, TouchableOpacity } from "react-native"
import { ModalSobre } from "../../components/modal/sobre";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Styles } from "./style"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";

interface IValues {
    context: IContext
    setContext: (value: any) => void
}

export default function Configuracao(): JSX.Element {
    const { context, setContext }: IValues = useContext(Context) as any
    console.log(context)
    const [modalSobre, setModalSobre] = useState<boolean>(false)
    const styles = Styles()

    function OpenCloseModalSobre() {
        setModalSobre(!modalSobre)
    }
    function GerarNumerosFontSize() {
        let armazena = []
        for (let i = 10; i <= 40; i++) {
            armazena.push(<Picker.Item key={i} label={String(i)} value={i} />)
        }
        return armazena
    }
    return (
        < View style={styles.container} >
            <ScrollView >
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
                            onValueChange={(value: boolean) => setContext(context.ChangeLightTheme(value))}
                            value={context.lightTheme}
                            style={{ transform: [{ scaleX: 1.9 }, { scaleY: 2 }] }}
                        />
                    </View>
                </View>
                <View style={styles.viewOptionTema}>
                    <View style={styles.viewImageThemeHeader} >
                        <Image
                            source={require("../../assets/images/fontSize.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={styles.viewOptionTemaOptions}>
                        <Text style={styles.viewOptionTemaText}>Fonte Biblia: </Text>
                        <Picker
                            style={styles.viewOptionFonteSizeOptionsPicker}
                            selectedValue={context.fonteSizeLeituraBiblia}
                            onValueChange={(value: number) => setContext(context.ChangeFonteSizeLeituraBiblia(value))}
                            mode="dropdown"
                        >
                            {GerarNumerosFontSize()}
                        </Picker>
                    </View>
                </View>
                <View style={styles.viewOptionTema}>
                    <View style={styles.viewImageThemeHeader} >
                        <Image
                            source={require("../../assets/images/musicFont.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={styles.viewOptionTemaOptions}>
                        <Text style={styles.viewOptionTemaText}>Fonte Hino: </Text>
                        <Picker
                            style={styles.viewOptionFonteSizeOptionsPicker}
                            selectedValue={context.fonteSizeHino}
                            onValueChange={(value: number) => setContext(context.ChangeFonteSizeHino(value))}
                            mode="dropdown"
                        >
                            {GerarNumerosFontSize()}
                        </Picker>
                    </View>
                </View>
                <View style={styles.viewOptionTema}>

                    <View style={styles.viewImageThemeHeader} >
                        <Image
                            source={require("../../assets/images/light.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={styles.viewOptionTemaOptions}>
                        <Text style={styles.viewOptionTemaText}>Tela ligada: </Text>
                        <Switch
                            thumbColor={context.keepScreenOn ? "#00f689" : "#f4f3f4"}
                            onValueChange={(value: boolean) => setContext(context.ChangeKeepScreenOn(value))}
                            value={context.keepScreenOn}
                            style={{ transform: [{ scaleX: 1.9 }, { scaleY: 2 }] }}
                        />
                    </View>
                </View>
                <View style={styles.viewOptionTema}>

                    <View style={styles.viewImageThemeHeader} >
                        <Image
                            source={require("../../assets/images/default.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={[styles.viewOptionTemaOptions, { width: "100%", justifyContent: "center", }]}>
                        <TouchableOpacity style={styles.viewOptionTemaButtontPadrao}>
                            <Text style={styles.viewOptionTemaTextPadrao}
                                onPress={() => setContext(context.Padrao())}
                            >Config. padrão </Text>
                        </TouchableOpacity>

                    </View>
                    <ModalSobre modalSobre={modalSobre} OpenCloseModalSobre={OpenCloseModalSobre} />
                </View>
                <View style={styles.viewOptionTema}>

                    <View style={styles.viewImageThemeHeader} >
                        <Image
                            source={require("../../assets/images/about.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={[styles.viewOptionTemaOptions, { width: "100%", justifyContent: "center", }]}>
                        <TouchableOpacity style={styles.viewOptionTemaButtontSobre}>
                            <Text style={styles.viewOptionTemaTextSobre}
                                onPress={() => OpenCloseModalSobre()}
                            >Sobre </Text>
                        </TouchableOpacity>

                    </View>
                    <ModalSobre modalSobre={modalSobre} OpenCloseModalSobre={OpenCloseModalSobre} />
                </View>
            </ScrollView >
        </View >
    )
}


