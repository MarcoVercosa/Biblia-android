import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    viewCampoPesquisa: {
        flexDirection: "row",
        width: "95%",
        alignSelf: "center",
        height: "10%",
        justifyContent: "space-around",
        marginTop: "5%"
    },
    textInputCampoPesquisa: {
        width: "55%",
        backgroundColor: "#e5e5e5",
        fontSize: 21,
        borderRadius: 30,
        padding: 10
    },
    textButton: {
        fontSize: 21
    },
    buttonPesquisar: {
        backgroundColor: "#03fa54",
        width: "40%",
        height: "100%",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    viewConteudo: {
        height: "85%",
        width: "95%",
        alignSelf: "center",
        marginTop: "2%"
    },
    flatListRenderizaConteudo: {

    },
    buttonRenderizaConteudo: {
        padding: "5%",
        backgroundColor: "#e1e5f6",
        marginTop: "2%",
        borderRadius: 30

    },
    textRenderizaConteudo: {
        fontSize: 20,
        color: "black"
    },
    textRenderizaOrigem: {
        fontSize: 18
    }
})

export { styles }