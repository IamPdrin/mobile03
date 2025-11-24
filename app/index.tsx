import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import BotaoLogin from '../components/botaoLogin';
import BotaoCadastro from '../components/botaoCadastro';
import BotaoAlternarArmazenamento from '../components/botaoAlternarArmazenamento';
import estilos from '../styles/style';
import { inicializarBancoDados } from '../services/databaseService';


export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    // Inicializar banco de dados quando o app carrega
    inicializarBancoDados();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={estilos.container}>
          <Text style={estilos.titulo}>Bem vindo ao TripHub!</Text>
          <Text style={estilos.iconeInicio}>✈️</Text>

          <TextInput 
            style={estilos.input} 
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput 
            style={estilos.input} 
            placeholder="Senha" 
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <BotaoLogin email={email} senha={senha}/>
          <BotaoCadastro/>

          <View style={{ marginTop: 20 }}>
            <Text style={estilos.tituloSecao}>Tipo de Armazenamento:</Text>
            <BotaoAlternarArmazenamento />
          </View>

          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
