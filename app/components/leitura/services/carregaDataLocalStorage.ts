import { IContextAppFavoritos } from "../../../interface/IContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CarregaUtimaLeituraLocalStorage = async () => {
    let resultado: string | any = await (AsyncStorage.getItem("ultimaLeitura"))
    if (resultado) {
        let data = JSON.parse(resultado)
        let { versao, testamento, livro, capitulo, versiculo } = data.modal
        return { versao, testamento, livro, capitulo, versiculo }
    }
}
const CarregaFavoritosLocalStorage = async (contextFavoritos: IContextAppFavoritos): Promise<[] | IContextAppFavoritos> => {
    let dados = await contextFavoritos.CarregarDados()
    if (dados) {
        return dados as IContextAppFavoritos
    }
    return []
}

export { CarregaUtimaLeituraLocalStorage, CarregaFavoritosLocalStorage }