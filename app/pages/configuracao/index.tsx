import React, { useContext, useState } from "react"
import { View, Text, Image, Switch, ScrollView, TouchableOpacity, Alert } from "react-native"
import { ModalSobre } from "../../components/modal/sobre";
import { Picker } from '@react-native-picker/picker';
import { Styles } from "./style"
import { Context } from "../../routes";
import { IContext } from "../../interface/IContext";
import { GerarNumerosFontSize, GerarFontTipo } from "./pickersComponents"

interface IValues {
    context: IContext
    setContext: (value: any) => void
}

export default function Configuracao(): JSX.Element {
    const { context, setContext }: IValues = useContext(Context) as any
    const [modalSobre, setModalSobre] = useState<boolean>(false)
    const styles = Styles()

    function OpenCloseModalSobre() {
        setModalSobre(!modalSobre)
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
                        <Text style={styles.viewOptionTemaText}>Tema LIGHT: <Text style={styles.viewOptionTemaTextInfo}>       Seu tema perfeito</Text></Text>

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
                        <Text style={styles.viewOptionTemaText}>Fonte Biblia: <Text style={styles.viewOptionTemaTextInfo}>       Para sua leitura</Text></Text>
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
                        <Text style={styles.viewOptionTemaText}>Fonte Hino: <Text style={styles.viewOptionTemaTextInfo}>       Para o louvor a Deus</Text></Text>
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
                            source={require("../../assets/images/fontTipo.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={styles.viewOptionTemaOptions}>
                        <Text style={styles.viewOptionTemaText}>Fonte Tipo: <Text style={styles.viewOptionTemaTextInfo}>       Para o seu tipo de ser</Text></Text>
                        <Picker
                            style={styles.viewOptionFonteSizeOptionsPicker}
                            selectedValue={context.fontTipo}
                            onValueChange={(value: string) => setContext(context.ChangeFontTipo(value))}
                            mode="dropdown"
                        >
                            {GerarFontTipo()}
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
                        <Text style={styles.viewOptionTemaText}>Tela ligada: <Text style={styles.viewOptionTemaTextInfo}>       Para sua concentração</Text></Text>
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
                        <TouchableOpacity style={styles.viewOptionTemaButtontPadrao}
                            onPress={() => {
                                setContext(context.Padrao())
                                Alert.alert("As configurações retornaram ao padrão do APP.")
                            }}
                        >
                            <Text style={styles.viewOptionTemaTextPadrao}>Config. padrão </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.viewOptionTema}>

                    <View style={styles.viewImageThemeHeader} >
                        <Image
                            source={require("../../assets/images/about.jpg")}
                            style={styles.imageHeader}
                        />
                    </View>
                    <View style={[styles.viewOptionTemaOptions, { width: "100%", justifyContent: "center", }]}>
                        <TouchableOpacity style={styles.viewOptionTemaButtontSobre}
                            onPress={() => OpenCloseModalSobre()}
                        >
                            <Text style={styles.viewOptionTemaTextSobre}>Sobre </Text>
                        </TouchableOpacity>

                    </View>
                    <ModalSobre modalSobre={modalSobre} OpenCloseModalSobre={OpenCloseModalSobre} />
                </View>
            </ScrollView >
        </View >
    )
}


