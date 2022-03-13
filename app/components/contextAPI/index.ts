import { IContext } from "../../interface/IContext"
import AsyncStorage from '@react-native-async-storage/async-storage';


let values: IContext = {
    lightTheme: true,
    ChangeLightTheme: function (value) {
        return { ...this, lightTheme: value }
    },
    fonteSizeLeituraBiblia: 20,
    ChangeFonteSizeLeituraBiblia: function (value) { return { ...this, fonteSizeLeituraBiblia: value } },
    fonteSizeHino: 22,
    ChangeFonteSizeHino: function (value) { return { ...this, fonteSizeHino: value } },
    keepScreenOn: false,
    ChangeKeepScreenOn: function (value) { return { ...this, keepScreenOn: value } },
    Padrao: function () {
        return {
            ...this,
            lightTheme: true,
            fonteSizeLeituraBiblia: 20,
            fonteSizeHino: 22,
            keepScreenOn: false,
        }
    },

}

export { values }


