import React from "react";
import { router } from "expo-router";
import { TouchableOpacity, Text, Alert } from "react-native";
import estilos from "../styles/style";
import { verificarLogin, obterUsuario } from "../services/databaseService";

export default function BotaoLogin({ email, senha }) {
    const [processando, setProcessando] = React.useState(false);
    
    const verificarLogin_Handler = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Por favor, preencha e-mail e senha');
            return;
        }

        try {
            setProcessando(true);
            const loginValido = await verificarLogin(email, senha);

            if (loginValido) {
                const usuario = await obterUsuario(email);
                Alert.alert('Login bem-sucedido!', `Bem-vindo, ${email}!`);
                router.push('/telaDashboard');
            } else {
                Alert.alert('Erro', 'E-mail ou senha incorretos.');
            }
        } catch (e) {
            console.log('Erro ao verificar o login:', e);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        } finally {
            setProcessando(false);
        }
    };

    return (
        <TouchableOpacity 
            style={estilos.botao} 
            onPress={verificarLogin_Handler}
            disabled={processando}
        >
            <Text style={estilos.textoBotao}>
                {processando ? 'Entrando...' : 'Entrar'}
            </Text>
        </TouchableOpacity>
    );
}