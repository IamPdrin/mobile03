import React from "react";
import { router } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function BotaoCadastro() {

    const navegarPara = () => {
        router.push('/telaCadastro');
    };

    return (
        <TouchableOpacity onPress={navegarPara}>
            <Text>Não tem cadastro? Cadastre-se aqui</Text>
        </TouchableOpacity>
    );
}