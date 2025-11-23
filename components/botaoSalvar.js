import React from "react";
import { router } from "expo-router";
import { TouchableOpacity, Text, Alert } from "react-native";
import estilos from "../styles/style";
import { cadastrarUsuario } from "../services/databaseService";

export default function BotaoSalvar({ nome, email, senha}) {
    const [processando, setProcessando] = React.useState(false);

    const salvarDados = async () => {
        if (!nome || !email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        try {
            setProcessando(true);
            const resultado = await cadastrarUsuario(email, senha);
            
            if (resultado.sucesso) {
                Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso!');
                router.push('/');
            } else {
                Alert.alert('Erro', resultado.mensagem);
            }
        } catch (e) {
            console.log('Erro ao salvar os dados:', e);
            Alert.alert('Erro', 'Ocorreu um erro ao cadastrar');
        } finally {
            setProcessando(false);
        }
    };

    return (
        <TouchableOpacity 
            style={estilos.botao} 
            onPress={salvarDados}
            disabled={processando}
        >
            <Text style={estilos.textoBotao}>
                {processando ? 'Cadastrando...' : 'Cadastrar'}
            </Text>
        </TouchableOpacity>
    );
}