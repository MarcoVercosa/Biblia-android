import React, { useState } from "react"
import { View, Text, Modal, TouchableOpacity } from "react-native"

function ModalHino({ modalHinoSelect, OpenCloseModalHino }: any) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalHinoSelect}
            onRequestClose={() => OpenCloseModalHino(false)}
        >
            <Text>
                MODAL
            </Text>

            <TouchableOpacity
                onPressOut={() => OpenCloseModalHino(false)}
            >
                <Text>
                    Sair
                </Text>
            </TouchableOpacity>
        </Modal>
    )
}

export { ModalHino }