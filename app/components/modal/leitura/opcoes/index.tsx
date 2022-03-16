import React, { useState, useEffect, memo } from "react"
import { View, Text, Modal, TouchableOpacity, SafeAreaView, TextInput, Image, Alert, FlatList } from "react-native"
import { IRetornoApiLeitura } from "../../../../interface/IRetornoApiLeitura"
import { IValoresArmazenados } from "../../../../interface/ImodalLeitura"
import { Styles } from "./style"

interface IProps {
    modalOpcoes: boolean
    OpenCloseModalOpcoes: (data: boolean) => void;
    dataParagrafo: string;
    dataNomes: IRetornoApiLeitura;
    dataNumeros: IValoresArmazenados

}
function ModalOpcoes({ dataParagrafo, dataNomes, dataNumeros, modalOpcoes, OpenCloseModalOpcoes }: IProps) {
    console.log("renderizou ModalOpcoes")
    const [anotacao, setAnotacao] = useState<string>("")
    const styles = Styles()
    return (

        <Modal
            animationType="slide"
            transparent={false}
            visible={modalOpcoes}
            onRequestClose={() => OpenCloseModalOpcoes(false)}
        >
            <View style={styles.viewContainer}>
                <View style={styles.viewImage}>
                    <TouchableOpacity style={styles.imageButton}
                    //onPressOut={ }
                    >
                        <Image
                            source={require("../../../../assets/images/favoriteStar.jpg")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewContent}>
                    <Text style={styles.textContent}></Text>
                    <Text style={styles.textDadosLivro}></Text>
                    <TextInput
                        style={styles.textInputAnotacao}
                        onChangeText={(value: string) => setAnotacao(value)}
                        value={anotacao}
                        placeholder="Anotação"
                        maxLength={40}
                        multiline
                    />
                </View>
            </View>
        </Modal>
    )
}

export default memo(ModalOpcoes)