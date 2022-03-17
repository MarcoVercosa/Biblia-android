import React, { useState, useEffect, memo } from "react"
import { View, Text, Modal, TouchableOpacity, SafeAreaView, TextInput, Image, Alert, FlatList } from "react-native"
import { IRetornoApiLeitura } from "../../../../interface/IRetornoApiLeitura"
import { IValoresArmazenados } from "../../../../interface/ImodalLeitura"
import { Styles } from "./style"

interface IProps {
    modalOpcoes: boolean
    OpenCloseModalOpcoes: (data: boolean) => void;
    dataParagrafo: string;
    versiculo: number,
    dataNomes: IRetornoApiLeitura;
    dataNumeros: IValoresArmazenados

}
function ModalOpcoes({ versiculo, dataParagrafo, dataNomes, dataNumeros, modalOpcoes, OpenCloseModalOpcoes }: IProps) {
    console.log("renderizou ModalOpcoes")
    const [anotacao, setAnotacao] = useState<string>("")
    const styles = Styles()

    function FavoritarVersiculo() {

        item.livro_nome,
            item.versao_id,
            item.livro_testamento_id,
            item.livro_id,
            item.capitulo,
            item.versiculo
    }
    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalOpcoes}
            onRequestClose={() => OpenCloseModalOpcoes(false)}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewImage}>
                    <TouchableOpacity style={styles.imageButton}>
                        <Image
                            source={require("../../../../assets/images/favoriteStar.jpg")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewContent}>
                    <Text style={styles.textContent}>{dataParagrafo}</Text>
                    <Text style={styles.textVersaoLivro}>{dataNomes.nomeVersao[0].versao_nome}</Text>
                    <Text style={styles.textLivroCapituloVersiculo}>{dataNomes.nomeLivro[0].livro_nome}/{dataNomes.nomeLivro[0].livro_abreviado}: Cap. {dataNomes.capituloAtual} Ver. {versiculo}</Text>
                    <TextInput
                        style={styles.textInputAnotacao}
                        onChangeText={(value: string) => setAnotacao(value)}
                        value={anotacao}
                        placeholder="Anotação"
                        maxLength={200}
                        multiline
                    />
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
                    //onPressOut={}
                    >
                        <Text style={styles.view_botoes_text}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default memo(ModalOpcoes)