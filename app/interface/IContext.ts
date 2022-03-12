export interface IContext {
    lightTheme: boolean;
    ChangeLightTheme: (value: boolean) => IContext
    fonteSizeLeituraBiblia: number,
    ChangeFonteSizeLeituraBiblia: (value: number) => IContext
    fonteSizeHino: number,
    ChangeFonteSizeHino: (value: number) => IContext
    keepScreenOn: boolean;
    ChangeKeepScreenOn: (value: boolean) => IContext
    Padrao: () => IContext,
    SaveLocalStorage: () => void
}
