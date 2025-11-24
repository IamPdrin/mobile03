import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

interface LocationComponentProps {
  visible: boolean;
  onClose: () => void;
  onLocationUpdate?: (location: Location.LocationObject) => void;
}

export default function LocationComponent({ visible, onClose, onLocationUpdate }: LocationComponentProps) {
  const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [assinatura, setAssinatura] = useState<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (visible) {
      inicializarLocalizacao();
    }

    return () => {
      if (assinatura) {
        assinatura.remove();
      }
    };
  }, [visible]);

  async function inicializarLocalizacao() {
    try {
      setCarregando(true);
      setMensagemErro(null);

      // Solicita permissão de localização em primeiro plano
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMensagemErro('Permissão negada para acessar a localização');
        setCarregando(false);
        return;
      }

      // Obtém a localização inicial
      const loc = await Location.getCurrentPositionAsync({});
      setLocalizacao(loc);

      if (onLocationUpdate) {
        onLocationUpdate(loc);
      }

      // Observa a localização continuamente
      const novaAssinatura = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        (loc) => {
          setLocalizacao(loc);
          if (onLocationUpdate) {
            onLocationUpdate(loc);
          }
        }
      );

      setAssinatura(novaAssinatura);
      setCarregando(false);
    } catch (erro) {
      console.error('Erro ao inicializar localização:', erro);
      setMensagemErro('Erro ao acessar localização');
      setCarregando(false);
    }
  }

  if (mensagemErro) {
    return (
      <Modal visible={visible} animationType="slide">
        <SafeAreaView style={estilos.container}>
          <Text style={estilos.erro}>{mensagemErro}</Text>
          <Button title="Fechar" onPress={onClose} color="#ff4444" />
        </SafeAreaView>
      </Modal>
    );
  }

  if (carregando || !localizacao) {
    return (
      <Modal visible={visible} animationType="slide">
        <SafeAreaView style={estilos.container}>
          <Text style={estilos.texto}>Obtendo localização...</Text>
          <Button title="Cancelar" onPress={onClose} color="#ff4444" />
        </SafeAreaView>
      </Modal>
    );
  }

  // Converter coordenadas para URL de mapa
  const lat = localizacao.coords.latitude;
  const lon = localizacao.coords.longitude;
  const mapUrl = `https://www.google.com/maps/search/${lat},${lon}`;

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={estilos.container}>
        <ScrollView contentContainerStyle={estilos.scrollContent}>
          <View style={estilos.header}>
            <Text style={estilos.titulo}>📍 Sua Localização</Text>
          </View>

          <View style={estilos.card}>
            <View style={estilos.infoBloco}>
              <Text style={estilos.label}>Latitude</Text>
              <Text style={estilos.valor}>{lat.toFixed(6)}°</Text>
            </View>

            <View style={estilos.separador} />

            <View style={estilos.infoBloco}>
              <Text style={estilos.label}>Longitude</Text>
              <Text style={estilos.valor}>{lon.toFixed(6)}°</Text>
            </View>

            <View style={estilos.separador} />

            <View style={estilos.infoBloco}>
              <Text style={estilos.label}>Altitude</Text>
              <Text style={estilos.valor}>{localizacao.coords.altitude?.toFixed(2) || 'N/A'} m</Text>
            </View>

            <View style={estilos.separador} />

            <View style={estilos.infoBloco}>
              <Text style={estilos.label}>Precisão</Text>
              <Text style={estilos.valor}>{localizacao.coords.accuracy?.toFixed(2) || 'N/A'} m</Text>
            </View>

            <View style={estilos.separador} />

            <View style={estilos.infoBloco}>
              <Text style={estilos.label}>Velocidade</Text>
              <Text style={estilos.valor}>{(localizacao.coords.speed ? localizacao.coords.speed * 3.6 : 0).toFixed(2)} km/h</Text>
            </View>

            <View style={estilos.separador} />

            <View style={estilos.infoBloco}>
              <Text style={estilos.label}>Timestamp</Text>
              <Text style={estilos.valor}>{new Date(localizacao.timestamp).toLocaleTimeString()}</Text>
            </View>
          </View>

          <View style={estilos.mapContainer}>
            <Text style={estilos.infoUrl}>🗺️ Ver no Google Maps:</Text>
            <TouchableOpacity
              style={estilos.botaoGoogleMaps}
              onPress={() => Linking.openURL(mapUrl)}
            >
              <Text style={estilos.textoBotaoGoogle}>Abrir Mapa</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={estilos.botaoFechar}>
          <Button title="Fechar" onPress={() => {
            if (assinatura) {
              assinatura.remove();
            }
            onClose();
          }} color="#ff4444" />
        </View>
      </SafeAreaView>
    </Modal>
  );
}


const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoBloco: {
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
  separador: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  mapContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoUrl: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  url: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  botaoGoogleMaps: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoGoogle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoFechar: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  erro: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
