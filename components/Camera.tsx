import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// ...existing code...

interface CameraComponentProps {
  visible: boolean;
  onClose: () => void;
  onCapture?: (uri: string) => void;
}

export default function CameraComponent({ visible, onClose, onCapture }: CameraComponentProps) {
  const [tipoCamera, setTipoCamera] = useState<CameraType>('back');
  const [permissaoCamera, solicitarPermissaoCamera] = useCameraPermissions();
  // ...existing code...
  const referenciaCamera = useRef<CameraView>(null);

  // ...existing code...

  if (!permissaoCamera) {
    return <View />;
  }

  if (!permissaoCamera.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={estilos.container}>
          <Text style={estilos.mensagem}>
            Precisamos da sua permissão para acessar a câmera
          </Text>
          <View style={estilos.areaBotoes}>
            <Button onPress={solicitarPermissaoCamera} title="Conceder permissão" />
            <Button onPress={onClose} title="Cancelar" color="red" />
          </View>
        </View>
      </Modal>
    );
  }

  function alternarCamera() {
    setTipoCamera((atual) => (atual === 'back' ? 'front' : 'back'));
  }

  async function tirarESalvarFoto() {
    try {
      if (!referenciaCamera.current) return;

      const foto = await referenciaCamera.current.takePictureAsync();

      if (foto?.uri) {
        // ...existing code...
        Alert.alert('Foto salva!', 'A imagem foi salva na sua galeria.');
        console.log('Foto tirada e salva em:', foto.uri);
        
        if (onCapture) {
          onCapture(foto.uri);
        }
        onClose();
      }
    } catch (erro) {
      console.error(erro);
      Alert.alert('Erro', 'Não foi possível tirar ou salvar a foto.');
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={estilos.container}>
        <CameraView style={estilos.camera} facing={tipoCamera} ref={referenciaCamera} />

        <View style={estilos.areaBotoes}>
          <TouchableOpacity style={estilos.botao} onPress={alternarCamera}>
            <Text style={estilos.textoBotao}>Virar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botao} onPress={tirarESalvarFoto}>
            <Text style={estilos.textoBotao}>Tirar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[estilos.botao, { backgroundColor: '#ff4444' }]} onPress={onClose}>
            <Text style={estilos.textoBotao}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mensagem: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  areaBotoes: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 32,
  },
  botao: {
    alignItems: 'center',
    backgroundColor: '#00000088',
    padding: 12,
    borderRadius: 8,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
