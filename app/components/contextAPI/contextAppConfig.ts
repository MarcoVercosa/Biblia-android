import { IContext } from "../../interface/IContext"
import AsyncStorage from '@react-native-async-storage/async-storage';
let contextConfiguracoes: IContext = {
    lightTheme: true,
    ChangeLightTheme: function (value) {
        return { ...this, lightTheme: value }
    },
    colorFont: function () { return this.lightTheme ? "#110d1c" : "#e5e5e5" },
    lightThemeColor: function () { return this.lightTheme ? "white" : "#13192a" },
    fonteSizeLeituraBiblia: 20,
    ChangeFonteSizeLeituraBiblia: function (value) { return { ...this, fonteSizeLeituraBiblia: value } },
    fonteSizeHino: 22,
    ChangeFonteSizeHino: function (value) { return { ...this, fonteSizeHino: value } },
    fontTipo: 'Roboto-Regular',
    ChangeFontTipo: function (value: string) { return { ...this, fontTipo: value } },
    keepScreenOn: false,
    ChangeKeepScreenOn: function (value) { return { ...this, keepScreenOn: value } },
    Padrao: function () {
        return {
            ...this,
            lightTheme: true,
            fonteSizeLeituraBiblia: 20,
            fonteSizeHino: 22,
            fontTipo: 'Roboto-Regular',
            keepScreenOn: false,
        }
    },
    CarregaDadosLocalStorage: async function () {
        let value = await AsyncStorage.getItem("contextConfiguracao")
        if (value) {
            let temp: IContext = JSON.parse(value)
            //as funções não são armazenadas no local storage, somente as keys e values(objs)
            //então so adiciona os valores abaixo no state e mantem as funções que já estão no state 
            return {
                ...this,
                lightTheme: temp.lightTheme,
                fonteSizeLeituraBiblia: temp.fonteSizeLeituraBiblia,
                fonteSizeHino: temp.fonteSizeHino,
                fontTipo: temp.fontTipo,
                keepScreenOn: temp.keepScreenOn
            } as any
        }
    },
    SalvaDadosLocalStorage(context) {
        AsyncStorage.setItem("contextConfiguracao", JSON.stringify(context))
    }
}
export { contextConfiguracoes }


