import React from "react"
import { View, Text, Modal, SafeAreaView, ScrollView } from "react-native"
import { Styles } from "./styles"


function ModalSobre({ modalSobre, OpenCloseModalSobre }: { modalSobre: boolean, OpenCloseModalSobre: (OpenCloseModalSobre: boolean | Number) => void }) {
    let styles = Styles()
    return (


        <Modal
            animationType="slide"
            transparent={false}
            visible={modalSobre}
            onRequestClose={() => OpenCloseModalSobre(false)}
        >
            <SafeAreaView style={styles.safeContainer}>
                <Text style={styles.titulo}>SOBRE</Text>
                <View style={styles.viewSobre}>
                    <ScrollView>
                        <Text style={styles.viewConteudo}> Olá, meu nome é Marco. Uma pessoa cheia de defeitos e que comete falhas, mas que sempre tenta fazer o melhor e melhorar para agradar a Deus</Text>
                        <Text style={styles.viewConteudo}> A vida de um cristão é feita de busca incansável pela boa, perfeita e agradável presença de Deus e de boas obras, obras que ajudam seu próximo e que agradam o Pai, filho e o Espírito Santo segundo a vontade de Deus.</Text>
                        <Text style={styles.viewConteudo}> Mas eu sempre achei que as obras que faço ou que já fiz ainda são pouquíssimas perto do que Deus já fez por mim.</Text>
                        <Text style={styles.viewConteudo}> É claro, mesmo que se eu dedicar minha vida inteira a fazer obras, ainda sim não será o suficiente perto do que Deus e seu filho Jesus já fizeram por mim.</Text>
                        <Text style={styles.viewConteudo}>  E como gosto muito de tecnologia, resolvi criar algo relacionado que agradasse a Deus.</Text>
                        <Text style={styles.viewConteudo}> E foi com muito orgulho e suor que criei o site e o APP FONTE DE VIDA, para que você possa de forma dinâmica, fácil e intuitiva
                            ler a palavra de Deus, pois Sua palavra é vida e vida em abundância e deve ser acessível de forma prática e fácil. </Text>
                        <Text style={styles.viewConteudo}>  O site FONTE DE VIDA e o APP Fonte de Vida foram criados para poderem levar a palavra, conhecimento e a vontade de Deus para qualquer lugar do mundo. </Text>
                        <Text style={styles.viewConteudo}> Aqui você tem acesso às 13 versões da bíblia sagrada totalmente online.</Text>
                        <Text style={styles.viewConteudo}> O site FONTE DE VIDA e o APP permitem você  encontrar de forma fácil o livro, capítulo e versículo e também por palavra !</Text>

                        <Text style={styles.viewConteudo}> Há também acesso aos 524 Hinos da Harpa Cristã. </Text>
                        <Text style={styles.viewConteudo}> Onde você pode buscar o hino desejado tanto por número, quanto pela pesquisa por palavra contida no Hino.</Text>

                        <Text style={styles.viewConteudo}>  Esse APP não tem fins lucrativos, por isso você não vai encontrar propaganda durante seu uso.</Text>

                        <Text style={styles.viewConteudo}> Caso você queira propor melhorias, correções ou até mesmo doações que ajudem a manter o site e o APP no ar, por favor, envie um e-mail com as informações: marco2011sky@gmail.com</Text>

                        <Text style={styles.viewConteudo}> QUE DEUS ABENÇOE CADA UM DE VOCÊS COM MUITA SAÚDE, PAZ E PRINCIPALMENTE COM A PRESENÇA DELE, NA QUAL É PERFEITA E AGRADÁVEL.</Text>

                        <Text style={styles.viewConteudo}> NÃO SE ESQUEÇA: VOCÊ É MUITO AMADO E ESPECIAL PRA DEUS. SEMPRE !!!</Text>

                        <Text style={styles.viewConteudo}> Um forte abraço a todos.</Text>

                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>

    )
}

export { ModalSobre }