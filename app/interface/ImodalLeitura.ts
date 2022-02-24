export interface IValoresArmazenados {
    versao: {
        versao_id: number | any,
        versao_nome: string
    };
    testamento: {
        testamento_id: number | any,
        testamento_nome: string
    };
    testamentoLimpaCampos: () => void
    livro: {
        livro_id: number | any;
        livro_testamento_id: number | any;
        livro_posicao: number | any,
        livro_nome: string,
        livro_abreviado: string,
    },
    livroLimpaCampos: () => void
    capitulo: boolean | number | any
}

