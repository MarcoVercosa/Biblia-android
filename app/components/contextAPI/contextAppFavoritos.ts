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
        color: "white",
        anotacao: "Jesus, nosso salvador !!!",
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
        return this
    },
    SalvarDados: function (conteudo, versaoNome, livroNome, capitulo, versiculo, color, { dadosUrlApi }, anotacao) {
        let verificaSeJaExiste = this.favoritos.find((value: Ifavoritos) =>
            value.dadosUrlApi.versao_id == dadosUrlApi.versao_id
            && value.dadosUrlApi.livro_id == dadosUrlApi.livro_id
            && value.capitulo == capitulo
            && value.versiculo == versiculo
        )
        if (verificaSeJaExiste) { return this }

        let armazenaFavoritosTemp: Ifavoritos[] = this.favoritos
        armazenaFavoritosTemp.push({ conteudo, versaoNome, livroNome, capitulo, versiculo, color, dadosUrlApi, anotacao })
        AsyncStorage.setItem("contextFavoritos", JSON.stringify(armazenaFavoritosTemp))
        return { ...this, favoritos: armazenaFavoritosTemp }
    },
    EditarDados: function (index, color, anotacao) {
        let armazenaFavoritosUpdate: Ifavoritos[] = this.favoritos
        armazenaFavoritosUpdate[index].color = color
        armazenaFavoritosUpdate[index].anotacao = anotacao
        AsyncStorage.setItem("contextFavoritos", JSON.stringify(armazenaFavoritosUpdate))
        return { ...this, favoritos: armazenaFavoritosUpdate }
    },
    ExcluirDados: function (versao_id, livro_id, capitulo, versiculo) {
        //se alguma das opcoes abaixo for diferente, retorna, 
        //pois se alguma é igual deve ser retirada
        let data: Ifavoritos[] = this.favoritos.filter((value: Ifavoritos) =>
            value.dadosUrlApi.versao_id != versao_id
            || value.dadosUrlApi.livro_id != livro_id
            || value.capitulo != capitulo
            || value.versiculo != versiculo
        )
        AsyncStorage.setItem("contextFavoritos", JSON.stringify(data))
        return { ...this, favoritos: data }
    },
    VerificaSeHaFavoritos: function (versao_id, livro_id, capitulo, versiculo) {
        let data: Ifavoritos[] = this.favoritos.filter((value: Ifavoritos) =>
            value.dadosUrlApi.versao_id == versao_id
            && value.dadosUrlApi.livro_id == livro_id
            && value.capitulo == capitulo
            && value.versiculo == versiculo
        )
        if (data.length > 0) { return data } else { return false }
    }

}
export { contextAppFavoritos }