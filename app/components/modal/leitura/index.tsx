import React, { useState, useEffect } from "react"
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { View, Text, Modal, SafeAreaView, Alert, StyleSheet, Image, TouchableOpacity } from "react-native"
import { GetApi } from "../../../api/index"

interface IModalLeitura {
    modalLeitura: boolean;
    OpenCloseModalLeitura: () => void
}

export default function ModalLeitura({ modalLeitura, OpenCloseModalLeitura }: IModalLeitura): JSX.Element {
    const [versaoFetch, setVersaoFetch] = useState([]);
    const [testamentoFetch, setTestamentoFetch] = useState([]);
    const [livroFetch, setLivroFetch] = useState([]);
    const [capituloFetch, setCapituloFetch] = useState<any>(false);
    const [renderizaCapitulos, setRenderizaCapitulos] = useState<any>([])

    const [valoresArmazenados, setValoresArmazenados] = useState({
        versao: {
            versao_id: undefined,
            versao_nome: "undefined"
        },
        versao_id: undefined,
        testamento: {
            testamento_id: undefined,
            testamento_nome: "undefined"
        },
        testamento_id: undefined,
        livro: {
            livro_id: undefined,
            livro_testamento_id: undefined,
            livro_posicao: undefined,
            livro_nome: "String",
            livro_abreviado: "String",
        },
        livro_id: undefined,
        capitulo: undefined,
        conteudo: "selecione",
        conteudo_id: undefined
    })


    async function PreencheCampos(path: string, setState: any): Promise<any> {
        let { data } = await GetApi(path)
        setState(data)
    }

    function RenderizaCapitulos() {
        let armazena = []
        for (let i = 0; i < capituloFetch[capituloFetch.length - 1]?.capitulo; i++) {
            armazena.push(<Picker.Item label={String(i)} value={i} />)
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
                        selectedValue={valoresArmazenados.versao.versao_nome}
                        // o value é o nome, filtra o array, se o nome dentro do array, for igual ao value, armazena os objeto da vez do loop
                        onValueChange={(value) => setValoresArmazenados((prevState: any) => {
                            return {
                                ...prevState, versao: versaoFetch.find((data: any) => data.versao_nome == value ? data : "")
                            }
                        })}
                        onFocus={() => PreencheCampos("mais/buscaversao", setVersaoFetch)}
                        mode="dropdown"
                    >
                        {versaoFetch.map((data: any) => {
                            return (
                                <Picker.Item label={data.versao_nome} value={data.versao_nome} />
                            )
                        })}
                    </Picker>
                    <Text style={styles.view_selects_text}>Testamento</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.testamento.testamento_nome}
                        onValueChange={(value) => setValoresArmazenados((prevState: any) => {
                            return {
                                ...prevState, testamento: testamentoFetch.find((data: any) =>
                                    data.testamento_nome == value ? data : "")
                            }
                        })}
                        onFocus={() => PreencheCampos("mais/buscatestamento", setTestamentoFetch)}
                        mode="dropdown"
                    >
                        {testamentoFetch.map((data: any) => {
                            return (
                                <Picker.Item label={data.testamento_nome} value={data.testamento_nome} />
                            )
                        })}
                    </Picker>

                    <Text style={styles.view_selects_text}>Livro</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.livro.livro_nome}
                        onValueChange={(value) => setValoresArmazenados((prevState: any) => {
                            return {
                                ...prevState, livro: livroFetch.find((data: any) =>
                                    data.livro_nome == value ? data : "")
                            }
                        })}
                        onFocus={() => PreencheCampos(`mais/buscalivros/${valoresArmazenados.testamento.testamento_id}`, setLivroFetch)}
                        mode="dropdown"
                    >
                        {livroFetch.map((data: any) => {
                            return (
                                <Picker.Item label={data.livro_nome} value={data.livro_nome} />
                            )
                        })}
                    </Picker>

                    <Text style={styles.view_selects_text}>Capitulo</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={valoresArmazenados.capitulo}
                        onValueChange={(value) => setValoresArmazenados((prevState: any) => {
                            return {
                                ...prevState, capitulo: value
                            }
                        })}
                        onFocus={() => PreencheCampos(`mais/buscacapitulo/${valoresArmazenados.versao.versao_id}/${valoresArmazenados.livro.livro_id}`, setCapituloFetch)}
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
                        onPressOut={OpenCloseModalLeitura}
                    >
                        <Text style={styles.view_botoes_text}>SAIR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.view_botoes_Buscar, styles.view_botoes_ambos]}
                    //onPressOut={ }
                    >
                        <Text style={styles.view_botoes_text}>BUSCAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view_titulo: {
        backgroundColor: "#08a0ff",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
    view_titulo_text: {
        fontSize: 23,
        textAlign: "center",
        fontWeight: "bold",
        color: "white"
    },
    view_selects: {
        height: "65%",
        width: "95%",
        alignSelf: "center"

    },
    view_selects_text: {
        fontSize: 20,
        marginTop: "7%",
        textAlign: "center",
        marginBottom: "2%",
        fontWeight: "bold"
    },
    picker: {
        backgroundColor: "#e5e5e5",
    },
    view_botoes: {
        height: "25%",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row"
    },
    view_botoes_ambos: {
        width: "40%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
        borderRadius: 30,
    },
    view_botoes_Buscar: {
        backgroundColor: "#03fa54",
    },
    view_botoes_Cancelar: {
        backgroundColor: "#ff3f69",
    },
    view_botoes_text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})