export interface IRetornoApiLeitura {
    conteudo: Array<{ conteudo: string }>;
    nomeLivro: Array<{ livro_nome: string, livro_abreviado: string }>;
    quantidadecapitulo: { capitulo: number };
    nomeVersao: Array<{ versao_nome: string; }>
    capituloAtual: number
}