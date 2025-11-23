import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import estilos from "../styles/style";
import Card from "../components/card";
import BotaoSair from "../components/botaoSair";

export default function Dashboard() {
  const [nome, setNome] = useState("");
  const [produtos, setProdutos] = useState([]);
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.removeItem("usuario");
    router.replace("/");
  };

  useEffect(() => {
    const loadUser = async () => {
      const json = await AsyncStorage.getItem("usuario");
      if (json) {
        setNome(JSON.parse(json).nome);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const getProdutos = async () => {
      const r = await fetch("https://fakestoreapi.com/products");
      const data = await r.json();
      setProdutos(data);
    };
    getProdutos();
  }, []);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Bem vindo ao Dashboard, {nome}!</Text>

      <Card data={produtos} />

      <BotaoSair 
        titulo="Sair" 
        cor="#d9534f"
        onPress={logout}
      />
    </View>
  );
}
