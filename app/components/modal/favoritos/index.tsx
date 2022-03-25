import React, { useState, useContext, memo, useEffect } from "react"
import { View, Text, Modal, TouchableOpacity, SafeAreaView, TextInput, Image, ScrollView } from "react-native"
import { IContextAppFavoritos } from "../../../interface/IContext"
import { ContextFavoritos } from "../../../routes"
import { Styles } from "./style"

interface IProps {
    index: number;
    modalEdit: boolean;
    OpenCloseModaEdit: (value: boolean) => void
}
interface IValues {
    contextFavoritos: IContextAppFavoritos;
    setContextFavoritos: (value: any) => void
}

function ModalEditFavorito({ index, modalEdit, OpenCloseModaEdit }: IProps) {
    const { contextFavoritos, setContextFavoritos }: IValues = useContext(ContextFavoritos) as any
    const [editAnotacao, setEditAnotacao] = useState<string>("")
    const [backGroundColor, setBackGroundColor] = useState<string>("")
    const styles = Styles()

    useEffect(() => {
        if (index != undefined) {
            setBackGroundColor(contextFavoritos.favoritos[index].color)
            setEditAnotacao(contextFavoritos.favoritos[index].anotacao)
        }
    }, [index])

    function SalvarAlteracoes() {
        setContextFavoritos(contextFavoritos.EditarDados(index, backGroundColor, editAnotacao))
        OpenCloseModaEdit(false)
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalEdit}
            onRequestClose={() => OpenCloseModaEdit(false)}
        >
            <ScrollView >

                <View style={styles.viewContainer}>

                    <View style={styles.viewImage}>
                        <TouchableOpacity style={styles.imageButton}>
                            <Image
                                source={require("../../../assets/images/pencil.jpg")}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewContent, { backgroundColor: backGroundColor }]}>
                        <Text style={styles.textContent}>{contextFavoritos.favoritos[index]?.conteudo}</Text>
                        <Text style={styles.textVersaoLivro}>{contextFavoritos.favoritos[index]?.versaoNome}</Text>
                        <Text style={styles.textLivroCapituloVersiculo}>{contextFavoritos.favoritos[index]?.livroNome}: Cap. {contextFavoritos.favoritos[index]?.capitulo} Ver. {contextFavoritos.favoritos[index]?.versiculo}</Text>
                        <View style={styles.viewInputContainer}>
                            <View style={styles.viewInputImage}>
                                <Image
                                    source={require("../../../assets/images/pencil.jpg")}
                                    style={styles.imageInput}
                                />
                            </View>
                            <View style={styles.viewInput}>
                                <TextInput
                                    style={styles.textInputAnotacao}
                                    onChangeText={(value: string) => setEditAnotacao(value)}
                                    value={editAnotacao}
                                    placeholder="Anotação"
                                    maxLength={200}
                                    multiline
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewColors}>
                        <Image
                            source={require("../../../assets/images/color-palette.jpg")}
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
                            onPress={() => OpenCloseModaEdit(false)}
                        >
                            <Text style={styles.view_botoes_text}>SAIR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.view_botoes_Buscar, styles.view_botoes_ambos]}
                            onPress={SalvarAlteracoes}
                        >
                            <Text style={styles.view_botoes_text}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

        </Modal >
    )
}

export default memo(ModalEditFavorito)