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
    versaoTestamentoLivroCapitulo: string;
    anotacoes: string;
    color: string;
    dadosUrlApi: string;
}
