import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import estilos from "../styles/style";
import { obterTipoArmazenamento, alterarTipoArmazenamento } from "../services/databaseService";

export default function BotaoAlternarArmazenamento() {
    const [tipoAtual, setTipoAtual] = useState('local');
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        carregarTipo();
    }, []);

    const carregarTipo = async () => {
        try {
            const tipo = await obterTipoArmazenamento();
            setTipoAtual(tipo);
        } catch (error) {
            console.log('Erro ao carregar tipo:', error);
        } finally {
            setCarregando(false);
        }
    };

    const alternarArmazenamento = async () => {
        try {
            const novoTipo = tipoAtual === 'local' ? 'remoto' : 'local';
            const sucesso = await alterarTipoArmazenamento(novoTipo);
            
            if (sucesso) {
                setTipoAtual(novoTipo);
                const mensagem = novoTipo === 'local' 
                    ? 'Alterado para armazenamento LOCAL (SQLite)'
                    : 'Alterado para armazenamento REMOTO';
                Alert.alert('Sucesso!', mensagem);
            } else {
                Alert.alert('Erro', 'Não foi possível alterar o tipo de armazenamento');
            }
        } catch (error) {
            console.log('Erro ao alternar armazenamento:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao alterar o armazenamento');
        }
    };

    if (carregando) {
        return (
            <TouchableOpacity style={estilos.botaoAlternar} disabled>
                <Text style={estilos.textoBotaoAlternar}>Carregando...</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity 
            style={[
                estilos.botaoAlternar,
                tipoAtual === 'local' ? estilos.botaoAlternarLocal : estilos.botaoAlternarRemoto
            ]}
            onPress={alternarArmazenamento}
        >
            <Text style={estilos.textoBotaoAlternar}>
                {tipoAtual === 'local' ? '💾 Local (SQLite)' : '☁️ Remoto'}
            </Text>
        </TouchableOpacity>
    );
}
