import axios from "axios";

let backEnd: string = "fontedevida.mavs.vps-kinghost.net"

export async function GetApi(livro: string): Promise<any> {

    const resultado = await axios({
        method: 'get',
        url: `http://${backEnd}:9000/${livro}`,
        headers: { 'origin': 'vidadafonte.com.br/android' },
    })
    return resultado
}