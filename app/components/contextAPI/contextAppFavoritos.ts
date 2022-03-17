import { IContextAppFavoritos } from "../../interface/IContext";
import { Ifavoritos } from "../../interface/IContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

let contextAppFavoritos: IContextAppFavoritos = {
    favoritos: [{
        conteudo: "Então ele fechou o livro, devolveu-o ao assistente e assentou-se. Na sinagoga todos tinham os olhos fitos nele;",
        versaoNome: "Nova Versão Internacional",
        testamentoNome: "Novo",
        livroNome: "Lucas",
        capitulo: 4,
        versiculo: 20,
        color: "red",
        dadosUrlApi: {
            versao_id: 4,
            livro_testamento_id: 2,
            livro_id: 5,
        },
    }],
    SalvarDados: function (conteudo, versaoNome, testamentoNome, livroNome, capitulo, versiculo, color, dadosUrlApi) {
        AsyncStorage.setItem("contextFavoritos", JSON.stringify({ ...this, conteudo, versaoNome, testamentoNome, livroNome, capitulo, versiculo, color, dadosUrlApi }))
        this.favoritos.push({ conteudo, versaoNome, testamentoNome, livroNome, capitulo, versiculo, color, dadosUrlApi })
        return { ...this }
    },
    ExcluirDados: function (context: any) {
        let data: Ifavoritos[] = this.favoritos.filter((value: Ifavoritos) => {
            if (value.dadosUrlApi.versao_id != context.dadosUrlApi.versao_id
                || value.capitulo != context.capitulo || value.versiculo != context.versiculo
            ) {
                return value
            }
        })

        return { data }
    }
}

export { contextAppFavoritos }