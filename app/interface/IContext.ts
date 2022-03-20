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
    CarregaDadosLocalStorage: () => Promise<IContext>
    SalvaDadosLocalStorage: (value: IContext) => any
}


export interface Ifavoritos {
    conteudo: string,
    versaoNome: string,
    livroNome: string,
    capitulo: number,
    versiculo: number,
    color: string,
    anotacao: string;
    dadosUrlApi: {
        versao_id: number,
        livro_testamento_id: number,
        livro_id: number,
    },
}

export interface IContextAppFavoritos {
    favoritos: Ifavoritos[],
    CarregarDados: () => Promise<IContextAppFavoritos | any>
    SalvarDados: (conteudo: string, versaoNome: string,
        livroNome: string, capitulo: number, versiculo: number, color: string,
        dadosUrlApiI: any, anotacao: string)
        => IContextAppFavoritos;
    ExcluirDados: (versao_id: number, livro_id: number, capitulo: number, versiculo: number) => any
    VerificaSeHaFavoritos: (versao_id: number, livro_id: number, capitulo: number, versiculo: number) => boolean
}

