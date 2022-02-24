import { StyleSheet } from "react-native"


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#e2e2e2",

    },
    viewHeader: {
        marginTop: "1%",
        height: "10%",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "grey",
        borderRadius: 50,
    },
    leituraButton: {
        width: "100%",
        alignItems: "center",
    },
    viewHeaderImage: {
        width: "15%",
        height: "100%",
        marginLeft: "2%",
    },
    viewContainerLeitura: {
        height: "90%"
    },
    viewContainerLeituraInfo: {
        height: "8%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1%",
        marginBottom: "2%",

    },
    textContainerLeituraInfo: {
        fontSize: 18,
        fontWeight: "bold",

    },
    viewContainerLeituraVersiculos: {
        width: "93%",
        alignSelf: "center"

    },
    textContainerLeituraVersiculos: {
        marginBottom: "5%",
        fontFamily: "Open Sans",
        fontSize: 20,
        color: "black",
    }

})

export { styles }