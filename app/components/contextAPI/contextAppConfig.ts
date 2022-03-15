import { IContext } from "../../interface/IContext"
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
export { contextConfiguracoes }


