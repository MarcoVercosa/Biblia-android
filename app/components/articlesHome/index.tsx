import * as React from "react"
import { Text, View, StyleSheet, ScrollView, Image } from "react-native"


export default function ArticlesHome() {
    return (
        <ScrollView >
            <View style={styles.viewArticles}>
                <Image
                    source={require("../../assets/images/biblia_article.jpg")}
                    style={styles.viewArticlesImage1}
                />
                <Text style={styles.viewArticlesTextHead}>
                    Totamente OnLine ! São 13 versões da palavra de Deus disponíveis para você:
                </Text>
                <Text style={styles.viewArticlesText}>
                    1993 – Almeida Revisada e Atualizada
                </Text>
                <Text style={styles.viewArticlesText}>
                    1969 – Almeida Revisada e Corrigida
                </Text>
                <Text style={styles.viewArticlesText}>
                    2009 – Almeida Revisada e Corrigida
                </Text>
                <Text style={styles.viewArticlesText}>
                    2017 – Nova Almeida Atualizada
                </Text>
                <Text style={styles.viewArticlesText}>
                    Nova Versão Internacional
                </Text>
                <Text style={styles.viewArticlesText}>
                    Nova Versão Transformadora
                </Text>
                <Text style={styles.viewArticlesText}>
                    1848 – Almeida Antiga
                </Text>
                <Text style={styles.viewArticlesText}>
                    Almeida Recebida
                </Text>
                <Text style={styles.viewArticlesText}>
                    King James Atualizada
                </Text>
                <Text style={styles.viewArticlesText}>
                    Basic English Bible
                </Text>
                <Text style={styles.viewArticlesText}>
                    New International Version
                </Text>
                <Text style={styles.viewArticlesText}>
                    American Standard Version
                </Text>
                <Image
                    source={require("../../assets/images/celular_article.jpg")}
                    style={styles.viewArticlesImage1}
                />
                <Text style={styles.viewArticlesTextHead}>
                    Fácil leitura em seu celular
                </Text>
                <Text style={styles.viewArticlesText}>
                    O site FONTE DE VIDA foi criado não só para ser de fácil acesso em seu computador,
                    mas também em seu celular. Para que você leia a palavra de Deus em qualquer lugar.
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewArticles: {
        alignItems: "center",
    },
    viewArticlesImage1: {
        height: 125,
        width: "30%",
        marginTop: "7%",
        marginBottom: "3%"
    },
    viewArticlesTextHead: {
        fontSize: 27,
        color: "#747b81",
        marginBottom: "5%",
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        alignSelf: "center"
    },
    viewArticlesText: {
        color: "#747b81",
        fontSize: 17,
        padding: "1.56%",
        textAlign: "center",
    }
})

