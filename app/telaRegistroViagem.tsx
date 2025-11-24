import React, { useState, useEffect } from "react";
import CalendarComponent from "../components/Calendar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import estilos from "../styles/style";
import Mapa from "../components/Mapa";
import { registrarViagem } from "../services/databaseService";

export default function TelaRegistroViagem() {
  const [email, setEmail] = useState("");
  const [dataViagem, setDataViagem] = useState<Date | null>(null);
  const [modalCalendarioVisivel, setModalCalendarioVisivel] = useState(false);
  const [nomeLocal, setNomeLocal] = useState("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [localizacao, setLocalizacao] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    carregarEmail();
  }, []);

  const carregarEmail = async () => {
    try {
      const json = await AsyncStorage.getItem("usuario");
      if (json) {
        const usuario = JSON.parse(json);
        setEmail(usuario.email);
      }
    } catch (erro) {
      console.error("Erro ao carregar email:", erro);
    }
  };

  const tirarFoto = async () => {
    try {
      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!resultado.canceled) {
        setFotoUri(resultado.assets[0].uri);
        Alert.alert("Sucesso", "Foto capturada com sucesso!");
      }
    } catch (erro) {
      Alert.alert("Erro", "Erro ao capturar foto");
      console.error(erro);
    }
  };

  const registrarViagemComEvento = async () => {
    if (!nomeLocal || !localizacao || !fotoUri || !dataViagem) {
      Alert.alert(
        "Erro",
        "Por favor, preencha o nome do local, capture uma foto, obtenha a localização e selecione a data da viagem."
      );
      return;
    }

    try {
      setCarregando(true);

      // Registrar no banco de dados
      const dataFormatada = dataViagem.toISOString().split("T")[0];
      const resultado = await registrarViagem(
        email,
        `Lat: ${localizacao.latitude.toFixed(4)}, Lon: ${localizacao.longitude.toFixed(4)}`,
        localizacao.latitude,
        localizacao.longitude,
        fotoUri,
        dataFormatada,
        nomeLocal
      );

      if (resultado.sucesso) {
        Alert.alert("Sucesso", "Viagem registrada com sucesso!");
        router.back();
      } else {
        Alert.alert("Erro", resultado.mensagem);
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert("Erro", "Erro ao registrar viagem");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={estilos.telaViagemContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
          <Text style={estilos.titulo}>Registrar Nova Viagem</Text>

          {/* Mapa com Localização */}
          <Text style={estilos.labelViajem}>Sua Localização:</Text>
          <Mapa
            onLocalizacaoObtida={(coords) => setLocalizacao(coords)}
          />

          {/* Nome do Local */}
          <Text style={estilos.labelViajem}>Nome do Local:</Text>
          <TextInput
            style={estilos.inputViajem}
            placeholder="Ex: Praia da Costa, Montanha XYZ"
            value={nomeLocal}
            onChangeText={setNomeLocal}
            placeholderTextColor="#999"
          />

          {/* Foto */}
          <Text style={estilos.labelViajem}>Foto do Local:</Text>
          {fotoUri ? (
            <View>
              <Image
                source={{ uri: fotoUri }}
                style={estilos.cameraPreview}
              />
              <TouchableOpacity
                style={estilos.botaoCapturar}
                onPress={tirarFoto}
              >
                <Text style={estilos.textoBotao}>Tirar Nova Foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={estilos.botaoCapturar}
              onPress={tirarFoto}
            >
              <Text style={estilos.textoBotao}>Tirar Foto</Text>
            </TouchableOpacity>
          )}

          {/* Data da Viagem */}
          <Text style={estilos.labelViajem}>Data da Viagem:</Text>
          <TouchableOpacity
            style={estilos.botaoCapturar}
            onPress={() => setModalCalendarioVisivel(true)}
          >
            <Text style={estilos.textoBotao}>
              {dataViagem ? dataViagem.toLocaleDateString() : "Selecionar Data"}
            </Text>
          </TouchableOpacity>

          <CalendarComponent
            visible={modalCalendarioVisivel}
            onClose={() => setModalCalendarioVisivel(false)}
            onDateSelected={(dateString) => {
              setDataViagem(new Date(dateString));
              setModalCalendarioVisivel(false);
            }}
          />

          {/* Botões de Ação */}
          <TouchableOpacity
            style={estilos.botaoRegistrar}
            onPress={registrarViagemComEvento}
            disabled={carregando}
          >
            <Text style={estilos.textoBotao}>
              {carregando ? "Registrando..." : "Registrar Viagem"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.botaoCancelar}
            onPress={() => router.back()}
            disabled={carregando}
          >
            <Text style={estilos.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
