import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import BotaoSair from "../components/botaoSair";
import CameraComponent from "../components/Camera";
import CalendarComponent from "../components/Calendar";
import LocationComponent from "../components/Location";
import { GerenciadorPermissoes, GerenciadorIntegrado } from "../services/integracaoService";
import estilos from "../styles/style";

export default function DashboardIntegrado() {
  const [email, setEmail] = useState("");
  const [permissoes, setPermissoes] = useState(false);
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);
  const [localizacaoVisivel, setLocalizacaoVisivel] = useState(false);
  const [eventos, setEventos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    carregarDadosUsuario();
    verificarPermissoes();
    carregarEventos();
  }, []);

  useEffect(() => {
    // Recarregar eventos quando o calendário fecha
    if (!calendarioVisivel) {
      carregarEventos();
    }
  }, [calendarioVisivel]);

  const carregarDadosUsuario = async () => {
    try {
      const json = await AsyncStorage.getItem("usuario");
      if (json) {
        const usuario = JSON.parse(json);
        // Extrai apenas o nome (antes do @)
        const nomeUsuario = usuario.email.split('@')[0];
        setEmail(nomeUsuario);
      }
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
    }
  };

  const verificarPermissoes = async () => {
    const status = await GerenciadorPermissoes.verificarPermissoes();
    const todasConcedidas = Object.values(status).every((p) => p);
    setPermissoes(todasConcedidas);

    if (!todasConcedidas) {
      const permissoesNaoConcedidas = Object.keys(status).filter(
        (chave) => !status[chave as keyof typeof status]
      );
      Alert.alert(
        "Permissões Necessárias",
        `Para usar todos os recursos, conceda permissão para: ${permissoesNaoConcedidas.join(", ")}`
      );
    }
  };

  const solicitarTodasPermissoes = async () => {
    const novasPermissoes = await GerenciadorPermissoes.solicitarTodasPermissoes();
    setPermissoes(Object.values(novasPermissoes).every((p) => p));
    
    if (Object.values(novasPermissoes).every((p) => p)) {
      Alert.alert("Sucesso", "Todas as permissões foram concedidas!");
    } else {
      Alert.alert(
        "Permissões Parciais",
        "Algumas permissões não foram concedidas. O app funcionará com limitações."
      );
    }
  };

  const carregarEventos = async () => {
    const eventosList = await GerenciadorIntegrado.obterEventosCalendario(30);
    setEventos(eventosList);
  };

  const handleCapturarFoto = (uri: string) => {
    Alert.alert("Foto Capturada", `Foto salva em: ${uri}`);
  };

  const handleEventoCriado = (eventId: string) => {
    Alert.alert("Evento Criado", `ID do evento: ${eventId}`);
    // Aguarda um pouco antes de recarregar para garantir que o evento foi salvo
    setTimeout(() => {
      carregarEventos();
    }, 500);
  };

  const handleLocalizacaoAtualizada = (localizacao: any) => {
    console.log("Localização atualizada:", localizacao.coords);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("usuario");
    router.replace("/");
  };

  return (
    <SafeAreaView style={estilos.safeArea}>
      <ScrollView contentContainerStyle={estilos.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={estilos.header}>
          <Text style={estilos.titulo}>Bem vindo ao Dashboard, {email}</Text>
        </View>

        {/* Status de Permissões */}
        <View style={[estilos.card, { backgroundColor: permissoes ? "#d4edda" : "#f8d7da", alignItems: 'center', padding: 20 }]}>
          <Text style={estilos.cardTitulo}>
            Status de Permissões: {permissoes ? "Ativas" : "Incompletas"}
          </Text>
          {!permissoes && (
            <TouchableOpacity style={estilos.botao} onPress={solicitarTodasPermissoes}>
              <Text style={estilos.textoBotao}>Ativar Todas as Permissões</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Seção de Viagens */}
        <Text style={estilos.secaoTitulo}>Gerenciamento de Viagens</Text>

        {/* Registrar Nova Viagem */}
        <TouchableOpacity
          style={[estilos.card, estilos.cardRecurso]}
          onPress={() => router.push('/telaRegistroViagem')}
        >
          <View style={estilos.cardHeader}>
            <Text style={estilos.icone}> ✈️ </Text>
            <View style={estilos.cardTexto}>
              <Text style={estilos.cardTitulo}>Registrar Viagem</Text>
              <Text style={estilos.cardDescricao}>Adicionar uma nova localidade visitada</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Minhas Viagens */}
        <TouchableOpacity
          style={[estilos.card, estilos.cardRecurso]}
          onPress={() => router.push('/telaMinhasViagens')}
        >
          <View style={estilos.cardHeader}>
            <Text style={estilos.icone}> 🗺️ </Text>
            <View style={estilos.cardTexto}>
              <Text style={estilos.cardTitulo}>Minhas Viagens</Text>
              <Text style={estilos.cardDescricao}>Ver histórico de viagens realizadas</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Botão de Sair */}
        <BotaoSair titulo="Sair" cor="#d9534f" onPress={logout} />

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modals dos Componentes */}
      <CameraComponent
        visible={cameraVisivel}
        onClose={() => setCameraVisivel(false)}
        onCapture={handleCapturarFoto}
      />

      <CalendarComponent
        visible={calendarioVisivel}
        onClose={() => setCalendarioVisivel(false)}
        onDateSelected={handleEventoCriado}
      />

      <LocationComponent
        visible={localizacaoVisivel}
        onClose={() => setLocalizacaoVisivel(false)}
        onLocationUpdate={handleLocalizacaoAtualizada}
      />
    </SafeAreaView>
  );
}
