export interface IResultadoAPI {
    capitulo: number;
    conteudo: string;
    livro_abreviado: string;
    livro_id: number;
    livro_nome: string;
    livro_testamento_id: number;
    versao_id: number;
    versiculo: number;
}
export interface IFlatListConteudo {
    item: IResultadoAPI
}
