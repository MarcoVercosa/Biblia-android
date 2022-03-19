import { IContextAppFavoritos } from "../../interface/IContext";
import { Ifavoritos } from "../../interface/IContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

let contextAppFavoritos: IContextAppFavoritos = {
    favoritos: [{
        conteudo: "Tendo fechado o livro, Jesus o devolveu ao assistente e sentou-se. Todos na sinagoga tinham os olhos fixos nele.",
        versaoNome: "Nova Versão Internacional",
        livroNome: "Lucas",
        capitulo: 4,
        versiculo: 20,
        color: "red",
        dadosUrlApi: {
            versao_id: 4,
            livro_testamento_id: 2,
            livro_id: 42,
        },
    }],
    CarregarDados: async function () {
        let dados = await AsyncStorage.getItem("contextFavoritos")
        if (dados) {
            return { ...this, favoritos: JSON.parse(dados) }
        }
    },
    SalvarDados: function (conteudo, versaoNome, livroNome, capitulo, versiculo, color, { dadosUrlApi }) {
        let armazenaFavoritosTemp: Ifavoritos[] = this.favoritos
        armazenaFavoritosTemp.push({ conteudo, versaoNome, livroNome, capitulo, versiculo, color, dadosUrlApi })
        AsyncStorage.setItem("contextFavoritos", JSON.stringify(armazenaFavoritosTemp))
        return { ...this, favoritos: armazenaFavoritosTemp }
    },
    ExcluirDados: function (versao_id, livro_id, capitulo, versiculo) {
        console.log("Me chamou")
        console.log(versao_id, livro_id, capitulo, versiculo)
        let data: Ifavoritos[] = this.favoritos.filter((value: Ifavoritos) =>
            //console.log(value)
            value.dadosUrlApi.versao_id != versao_id
            || value.dadosUrlApi.livro_id != livro_id
            || value.capitulo != capitulo
            || value.versiculo != versiculo
        )
        console.log(data)
        AsyncStorage.setItem("contextFavoritos", JSON.stringify(data))
        return { ...this, favoritos: data }
    }
}

export { contextAppFavoritos }