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


export interface Ifavoritos {
    conteudo: string,
    versaoNome: string,
    testamentoNome: string,
    livroNome: string,
    capitulo: number,
    versiculo: number,
    color: string,
    dadosUrlApi: {
        versao_id: number,
        livro_testamento_id: number,
        livro_id: number,
    },
}

export interface IContextAppFavoritos {
    favoritos: Ifavoritos[],
    SalvarDados: (conteudo: string, versaoNome: string, testamentoNome: string,
        livroNome: string, capitulo: number, versiculo: number, color: string,
        dadosUrlApiI: any)
        => IContextAppFavoritos;
    ExcluirDados: (value: Ifavoritos) => any
}

