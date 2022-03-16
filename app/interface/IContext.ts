export interface IContext {
    lightTheme: boolean;
    colorFont: () => string
    lightThemeColor: () => string
    ChangeLightTheme: (value: boolean) => IContext
    fonteSizeLeituraBiblia: number,
    ChangeFonteSizeLeituraBiblia: (value: number) => IContext
    fonteSizeHino: number,
    ChangeFonteSizeHino: (value: number) => IContext
    keepScreenOn: boolean;
    ChangeKeepScreenOn: (value: boolean) => IContext
    Padrao: () => IContext,
}


export interface IContextAppFavoritos {
    conteudo: string;
    versao: string;
    testamento: string;
    livro: string;
    capitulo: number;
    versiculo: number;
    color: string;
    dadosUrlApi: string;
}
