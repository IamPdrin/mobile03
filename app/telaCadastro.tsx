import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import BotaoSalvar from '../components/botaoSalvar';
import estilos from '../styles/style';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={estilos.container}>
        <Text style={estilos.titulo}>Cadastro</Text>

        <TextInput 
          style={estilos.input} 
          placeholder='Nome'
          value={nome}
          onChangeText={setNome}
        />

        <TextInput 
          style={estilos.input} 
          placeholder='E-mail'
          value={email}
          onChangeText={setEmail}
        />

        <TextInput 
          style={estilos.input} 
          placeholder='Senha' 
          secureTextEntry={true} 
          value={senha}
          onChangeText={setSenha}
        />

        <BotaoSalvar nome={nome} email={email} senha={senha}/>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
