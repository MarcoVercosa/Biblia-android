import React, { useContext } from "react"
import { Text, View, StyleSheet, ScrollView, Image } from "react-native"
import { Styles } from "./style"

export default function ArticlesHome(): JSX.Element {
    const styles = Styles()
    return (
        <ScrollView >
            <View style={styles.viewArticles}>
                <Image
                    source={require("../../assets/images/biblia_article.jpg")}
                    style={styles.viewArticlesImage1}
                />
                <Text style={[styles.viewArticlesTextHead]}>
                    Totamente OnLine ! São 13 versões da palavra de Deus disponíveis para você:
                </Text>
                <Text style={[styles.viewArticlesText,]}>
                    1993 – Almeida Revisada e Atualizada
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    1969 – Almeida Revisada e Corrigida
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    2009 – Almeida Revisada e Corrigida
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    2017 – Nova Almeida Atualizada
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    Nova Versão Internacional
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    Nova Versão Transformadora
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    1848 – Almeida Antiga
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    Almeida Recebida
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    King James Atualizada
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    Basic English Bible
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    New International Version
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    American Standard Version
                </Text>
                <Image
                    source={require("../../assets/images/celular_article.jpg")}
                    style={styles.viewArticlesImage1}
                />
                <Text style={[styles.viewArticlesTextHead]}>
                    Fácil leitura em seu celular
                </Text>
                <Text style={[styles.viewArticlesText]}>
                    O site FONTE DE VIDA foi criado não só para ser de fácil acesso em seu computador,
                    mas também em seu celular. Para que você leia a palavra de Deus em qualquer lugar.
                </Text>
            </View>
        </ScrollView>
    )
}



