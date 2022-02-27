import React, { useState } from "react"
import { Picker } from '@react-native-picker/picker';
import { View, Text, Modal, TouchableOpacity } from "react-native"
import { GetApi } from "../../../api/index"
import { styles } from "./style"
import { IValoresArmazenados } from "../../../interface/ImodalLeitura"

interface IModalLeitura {
    modalLeitura: boolean;
    OpenCloseModalLeitura: (dadosSelecionadosModal?: IValoresArmazenados | boolean) => void
}

export default function ModalLeitura({ modalLeitura, OpenCloseModalLeitura }: IModalLeitura): JSX.Element {
    const [versaoFetch, setVersaoFetch] = useState([]);
    const [testamentoFetch, setTestamentoFetch] = useState([]);
    const [livroFetch, setLivroFetch] = useState([]);
    const [capituloFetch, setCapituloFetch] = useState<any>(false);

    const [valoresArmazenados, setValoresArmazenados] = useState<IValoresArmazenados>({
        versao: {
            versao_id: undefined,
            versao_nome: "undefined"
        },
        testamento: {
            testamento_id: undefined,
            testamento_nome: "undefined"
        },
        testamentoLimpaCampos() {
            setLivroFetch([])
            setCapituloFetch(false)
            setValoresArmazenados(prevState => { return { ...prevState, capitulo: false } })
        },
        livro: {
            livro_id: undefined,
            livro_testamento_id: undefined,
            livro_posicao: undefined,
            livro_nome: "undefined",
            livro_abreviado: "undefined",
        },
        livroLimpaCampos() {
            setCapituloFetch(false)
            setValoresArmazenados(prevState => { return { ...prevState, capitulo: false } })
        },
        capitulo: false
    })

    async function FetchData(path: string, setState: any): Promise<any> {
        let { data } = await GetApi(path)
        setState(data)
    }

    //faz um loop no var que contem os dados da Api. faz um Find para armazenar os Obj respectivos ao valor selecionado e armazena no useState
    //valueSelect: valor campo selecionado - nameObject: nome da keyObject da var valoresArmazenados
    //dataFetch: var onde estão armazenados os dados do campo buscados na Api - objDataFetch: nome da keyObject dentro do dataFetch
    function ArmazenaSelecao(valueSelect: string, nameObject: string, dataFetch: Array<{}>, objDataFetch: string, functionLimpaCampo?: any) {
        setValoresArmazenados((prevState: any) => {
            return {
                ...prevState, [nameObject]: dataFetch.find((data: any) => data[objDataFetch] == valueSelect ? data : "")
            }
        })
        //limpa os demais campos
        if (functionLimpaCampo == "testamentoLimpaCampos") {
            return valoresArmazenados.testamentoLimpaCampos()
        }
        //limpa os demais campos
        if (functionLimpaCampo == "livroLimpaCampos") {
            return valoresArmazenados.livroLimpaCampos()
        }
    }

    //cria componente que renderiza os numeros do capitulo
    function RenderizaCapitulos() {
        let armazena = []
        for (let i = 1; i <= capituloFetch[capituloFetch.length - 1]?.capitulo; i++) {
            armazena.push(<Picker.Item key={i} label={String(i)} value={i} />)
        }
        return armazena

    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalLeitura}
            onRequestClose={() => {
                OpenCloseModalLeitura
            }}
        >
            <View style={styles.container}>
                <View style={styles.view_titulo}>
                    <Text style={styles.view_titulo_text}>
                        Selecione suas opções para leitura
                    </Text>
                </View>

                <View style={styles.view_selects}>
                    <Text style={styles.view_selects_text}>Versão</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.versao?.versao_nome}
                        // ao selecionar um item, chama a função para armazenar
                        onValueChange={(value: string) => ArmazenaSelecao(value, "versao", versaoFetch, "versao_nome")}
                        onFocus={() => FetchData("mais/buscaversao", setVersaoFetch)}
                        mode="dropdown"
                    >
                        {versaoFetch.map((data: any, index: number) => {
                            return (
                                <Picker.Item key={index} label={data.versao_nome} value={data.versao_nome} />
                            )
                        })}
                    </Picker>
                    <Text style={styles.view_selects_text}>Testamento</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.testamento?.testamento_nome}
                        onValueChange={(value: string) => ArmazenaSelecao(value, "testamento", testamentoFetch, "testamento_nome", "testamentoLimpaCampos")}
                        onFocus={() => FetchData("mais/buscatestamento", setTestamentoFetch)}
                        mode="dropdown"
                    >
                        {testamentoFetch.map((data: any, index: number) => {
                            return (
                                <Picker.Item key={index} label={data.testamento_nome} value={data.testamento_nome} />
                            )
                        })}
                    </Picker>

                    <Text style={styles.view_selects_text}>Livro</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.livro?.livro_nome}
                        onValueChange={(value: string) => ArmazenaSelecao(value, "livro", livroFetch, "livro_nome", "livroLimpaCampos")}
                        onFocus={() => FetchData(`mais/buscalivros/${valoresArmazenados.testamento.testamento_id}`, setLivroFetch)}
                        mode="dropdown"
                    >
                        {livroFetch.map((data: any, index: number) => {
                            return (
                                <Picker.Item key={index} label={data.livro_nome} value={data.livro_nome} />
                            )
                        })}
                    </Picker>

                    <Text style={styles.view_selects_text}>Capitulo</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.capitulo}
                        onValueChange={(value: number) => setValoresArmazenados((prevState: any) => { return { ...prevState, capitulo: value } })}
                        onFocus={() => FetchData(`mais/buscacapitulo/${valoresArmazenados.versao.versao_id}/${valoresArmazenados.livro.livro_id}`, setCapituloFetch)}
                        mode="dropdown"
                    >
                        {capituloFetch &&
                            RenderizaCapitulos()
                        }
                    </Picker>
                </View>

                <View style={styles.view_botoes}>
                    <TouchableOpacity
                        style={[styles.view_botoes_Cancelar, styles.view_botoes_ambos]}
                        onPressOut={() => OpenCloseModalLeitura(false)}
                    >
                        <Text style={styles.view_botoes_text}>SAIR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.view_botoes_Buscar, styles.view_botoes_ambos]}
                        disabled={!valoresArmazenados.capitulo}
                        onPressOut={() => { OpenCloseModalLeitura(valoresArmazenados) }}
                    >
                        <Text style={styles.view_botoes_text}>BUSCAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}