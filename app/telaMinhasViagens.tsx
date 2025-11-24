import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import estilos from "../styles/style";
import { obterViagens, deletarViagem } from "../services/databaseService";

export default function TelaMinhasViagens() {
  const [viagens, setViagens] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  const carregarDados = async () => {
    try {
      setCarregando(true);
      const json = await AsyncStorage.getItem("usuario");
      if (json) {
        const usuario = JSON.parse(json);
        setEmail(usuario.email);
        
        const viagensLista = await obterViagens(usuario.email);
        setViagens(viagensLista || []);
      }
    } catch (erro) {
      console.error("Erro ao carregar viagens:", erro);
    } finally {
      setCarregando(false);
    }
  };

  const excluirViagem = (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta viagem?",
      [
        { text: "Cancelar", onPress: () => {} },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              const resultado = await deletarViagem(id);
              if (resultado.sucesso) {
                Alert.alert("Sucesso", "Viagem excluída com sucesso");
                carregarDados();
              } else {
                Alert.alert("Erro", resultado.mensagem);
              }
            } catch (erro) {
              Alert.alert("Erro", "Erro ao excluir viagem");
              console.error(erro);
            }
          },
        },
      ]
    );
  };

  const renderViagemCard = ({ item }: { item: any }) => (
    <View style={estilos.viagemCard}>
      {item.foto_uri ? (
        <Image
          source={{ uri: item.foto_uri }}
          style={estilos.viagemFoto}
        />
      ) : (
        <View style={[estilos.viagemFoto, { backgroundColor: "#e0e0e0", justifyContent: "center", alignItems: "center" }]}>
          <Text style={{ color: "#999" }}>Sem foto</Text>
        </View>
      )}
      
      <View style={estilos.viagemInfoContainer}>
        <Text style={estilos.viagemNome}>{item.nome_local}</Text>
        <Text style={estilos.viagemLocal}>📍 {item.local}</Text>
        <Text style={estilos.viagemData}>📅 {item.data_viagem}</Text>
        <Text style={estilos.viagemCoordenadas}>
          🧭 Lat: {item.latitude?.toFixed(4)}, Lon: {item.longitude?.toFixed(4)}
        </Text>

        <TouchableOpacity
          style={estilos.botaoDeletarViagem}
          onPress={() => excluirViagem(item.id)}
        >
          <Text style={estilos.textoBotaoDeletar}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (viagens.length === 0 && !carregando) {
    return (
      <SafeAreaView style={estilos.listaViagensContainer}>
        <View style={estilos.viagensVazias}>
          <Text style={estilos.textVagensVazias}>
            Nenhuma viagem registrada ainda.
          </Text>
          <Text style={[estilos.textVagensVazias, { marginTop: 10 }]}>
            Comece a registrar suas aventuras!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.listaViagensContainer}>
      <View style={{ paddingHorizontal: 15, paddingTop: 15, marginBottom: 10 }}>
        <Text style={estilos.titulo}>Minhas Viagens</Text>
        <Text style={{ fontSize: 14, color: "#666", marginBottom: 10 }}>
          Total: {viagens.length} viagem{viagens.length !== 1 ? "s" : ""}
        </Text>
      </View>
      
      <FlatList
        data={viagens}
        renderItem={renderViagemCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregarDados} />
        }
      />
    </SafeAreaView>
  );
}
