import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#e2e2e2",
    },
    viewHeader: {
        height: "10%",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#c7d5e8",
        borderRadius: 50,
        backgroundColor: "#c7d5e8",
        marginTop: "0.7%"
    },
    modalPesquisaHino: {
        alignItems: "center",
        marginTop: "1%",
    },
    viewHinoModalImage: {
        width: "15%",
        height: "100%",
        marginLeft: "2%",
    },
    viewLetraHino: {
        height: "89.0%",
        width: "95%",
        alignSelf: "center",

    },
    tituloLetraHino: {
        fontSize: 32,
        textAlign: "center",
        marginTop: "5%",
        marginBottom: "2%",
        height: "14%",
    },
    conteudoLetraHinoButtonShare: {
        height: "8%",
        justifyContent: "center",
        alignItems: "flex-end",
        width: "100%",
    },
    conteudoLetraHinoImageShare: {
        height: 40,
        width: 40,
    },
    renderizaConteudos: {
        width: "95%"
    },
    conteudoLetraHino: {
        width: "100%",
        textAlign: "center",
        fontSize: 20,
        color: "black"
    },

})

export { styles }