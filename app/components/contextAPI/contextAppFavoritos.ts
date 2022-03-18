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
    SalvarDados: function (conteudo, versaoNome, livroNome, capitulo, versiculo, color, dadosUrlApi) {
        let armazenaFavoritosTemp: Ifavoritos[] = this.favoritos
        armazenaFavoritosTemp.push({ conteudo, versaoNome, livroNome, capitulo, versiculo, color, dadosUrlApi })
        AsyncStorage.setItem("contextFavoritos", JSON.stringify(armazenaFavoritosTemp))
        return { ...this, favoritos: armazenaFavoritosTemp }
    },
    ExcluirDados: function (context: any) {
        let data: Ifavoritos[] = this.favoritos.filter((value: Ifavoritos) => {
            if (value.dadosUrlApi.versao_id != context.dadosUrlApi.versao_id
                || value.capitulo != context.capitulo || value.versiculo != context.versiculo
            ) {
                AsyncStorage.setItem("contextFavoritos", JSON.stringify(data))
                return value
            }
        })
        return { data }
    }
}

export { contextAppFavoritos }