import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import estilos from "../styles/style";

interface MakaProps {
  onLocalizacaoObtida?: (coords: any) => void;
}

export default function Mapa({ onLocalizacaoObtida }: MakaProps) {
  const [localizacao, setLocalizacao] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    obterLocalizacao();
  }, []);

  const obterLocalizacao = async () => {
    try {
      setCarregando(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== "granted") {
        setErro("Permissão de localização negada");
        setCarregando(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocalizacao(location.coords);
      if (onLocalizacaoObtida) {
        onLocalizacaoObtida(location.coords);
      }
    } catch (erro) {
      console.error("Erro ao obter localização:", erro);
      setErro("Erro ao obter localização");
    } finally {
      setCarregando(false);
    }
  };

  const abrirGoogleMaps = () => {
    if (localizacao) {
      const url = `https://www.google.com/maps/search/${localizacao.latitude},${localizacao.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={estilos.mapContainer}>
      {carregando ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : erro ? (
        <Text style={estilos.mapText}>{erro}</Text>
      ) : localizacao ? (
        <View>
          <Text style={estilos.coordenadas}>Sua Localização Atual</Text>
          <Text style={estilos.mapText}>
            Lat: {localizacao.latitude.toFixed(4)}
          </Text>
          <Text style={estilos.mapText}>
            Lon: {localizacao.longitude.toFixed(4)}
          </Text>
          <Text style={estilos.mapText}>
            Altitude: {localizacao.altitude?.toFixed(2) || "N/A"} m
          </Text>
          <Text style={estilos.mapText}>
            Precisão: {localizacao.accuracy?.toFixed(2) || "N/A"} m
          </Text>

          <TouchableOpacity
            style={[estilos.botao, { marginTop: 15, width: "90%", marginLeft: "5%" }]}
            onPress={abrirGoogleMaps}
          >
            <Text style={estilos.textoBotao}>Abrir no Google Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.botao, { marginTop: 10, width: "90%", marginLeft: "5%" }]}
            onPress={obterLocalizacao}
          >
            <Text style={estilos.textoBotao}>Atualizar Localização</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={estilos.mapText}>Nenhuma localização obtida</Text>
      )}
    </View>
  );
}
