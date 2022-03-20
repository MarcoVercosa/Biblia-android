import React, { useState, useContext, memo } from "react"
import { View, Text, Modal, TouchableOpacity, SafeAreaView, TextInput, Image, ScrollView, Alert } from "react-native"
import { IRetornoApiLeitura } from "../../../../interface/IRetornoApiLeitura"
import { IValoresArmazenados } from "../../../../interface/ImodalLeitura"
import { IContextAppFavoritos } from "../../../../interface/IContext"
import { ContextFavoritos } from "../../../../routes"
import { Styles } from "./style"

interface IProps {
    modalOpcoes: boolean
    OpenCloseModalOpcoes: (data: boolean) => void;
    dataParagrafo: string;
    versiculo: number,
    dataNomes: IRetornoApiLeitura;
    dataNumeros: IValoresArmazenados
}
interface IValues {
    contextFavoritos: IContextAppFavoritos;
    setContextFavoritos: (value: any) => void
}

function ModalOpcoes({ versiculo, dataParagrafo, dataNomes, dataNumeros, modalOpcoes, OpenCloseModalOpcoes }: IProps) {
    const { contextFavoritos, setContextFavoritos }: IValues = useContext(ContextFavoritos) as any
    const [anotacao, setAnotacao] = useState<string>("")
    const [backGroundColor, setBackGroundColor] = useState<string>("#e1e5f6")
    const styles = Styles()

    function FavoritarVersiculo() {
        setContextFavoritos(contextFavoritos.SalvarDados(dataParagrafo, dataNomes.nomeVersao[0].versao_nome,
            dataNomes.nomeLivro[0].livro_nome, dataNomes.capituloAtual, versiculo, backGroundColor,
            {
                dadosUrlApi: {
                    versao_id: dataNumeros.versao.versao_id,
                    livro_testamento_id: dataNumeros.testamento.testamento_id,
                    livro_id: dataNumeros.livro.livro_id
                },

            },
            anotacao
        ))
        Alert.alert("Versículo salvo em seus FAVORITOS")
        OpenCloseModalOpcoes(false)

    }
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalOpcoes}
            onRequestClose={() => OpenCloseModalOpcoes(false)}
        >
            <ScrollView >
                <View style={styles.viewContainer}>

                    <View style={styles.viewImage}>
                        <TouchableOpacity style={styles.imageButton}>
                            <Image
                                source={require("../../../../assets/images/favoriteStar.jpg")}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewContent, { backgroundColor: backGroundColor }]}>
                        <Text style={styles.textContent}>{dataParagrafo}</Text>
                        <Text style={styles.textVersaoLivro}>{dataNomes.nomeVersao[0].versao_nome}</Text>
                        <Text style={styles.textLivroCapituloVersiculo}>{dataNomes.nomeLivro[0].livro_nome}/{dataNomes.nomeLivro[0].livro_abreviado}: Cap. {dataNomes.capituloAtual} Ver. {versiculo}</Text>
                        <View style={styles.viewInputContainer}>
                            <View style={styles.viewInputImage}>
                                <Image
                                    source={require("../../../../assets/images/pencil.jpg")}
                                    style={styles.imageInput}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextInput
                                    style={styles.textInputAnotacao}
                                    onChangeText={(value: string) => setAnotacao(value)}
                                    value={anotacao}
                                    placeholder="Anotação"
                                    maxLength={200}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewColors}>
                        <Image
                            source={require("../../../../assets/images/color-palette.jpg")}
                            style={styles.imageInput}
                        />
                        <View style={styles.viewColorsView}>
                            <TouchableOpacity onPress={() => setBackGroundColor("#00d9cf")} style={[styles.viewColorsSelect, { backgroundColor: "#00d9cf" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#0088a1")} style={[styles.viewColorsSelect, { backgroundColor: "#0088a1" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#eac74a")} style={[styles.viewColorsSelect, { backgroundColor: "#eac74a" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#e0cdc9")} style={[styles.viewColorsSelect, { backgroundColor: "#e0cdc9" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#7c7874")} style={[styles.viewColorsSelect, { backgroundColor: "#7c7874" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#dcdeed")} style={[styles.viewColorsSelect, { backgroundColor: "#dcdeed" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#e2a5e2")} style={[styles.viewColorsSelect, { backgroundColor: "#e2a5e2" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#ff0f9b")} style={[styles.viewColorsSelect, { backgroundColor: "#ff0f9b" }]}></TouchableOpacity>
                            <TouchableOpacity onPress={() => setBackGroundColor("#06e17f")} style={[styles.viewColorsSelect, { backgroundColor: "#06e17f" }]}></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.view_botoes}>

                        <TouchableOpacity
                            style={[styles.view_botoes_Cancelar, styles.view_botoes_ambos]}
                            onPressOut={() => OpenCloseModalOpcoes(false)}
                        >
                            <Text style={styles.view_botoes_text}>SAIR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.view_botoes_Buscar, styles.view_botoes_ambos]}
                            //disabled={!valoresArmazenados.capitulo}
                            onPressOut={FavoritarVersiculo}
                        >
                            <Text style={styles.view_botoes_text}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

        </Modal >
    )
}

export default memo(ModalOpcoes)