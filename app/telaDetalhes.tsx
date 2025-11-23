import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import estilos from "../styles/style";

export default function Detalhes() {
  const route = useRoute();
  const { produto } = route.params as {
    produto: {
      image: string;
      title: string;
      price: number | string;
      description: string;
      category: string;
    };
  };

  return (
    <ScrollView style={estilos.containerDetalhe}>
      
      <Image 
        source={{ uri: produto.image }}
        style={estilos.imageDetalhe}
        resizeMode="contain"
      />

      <View style={estilos.conteudoDetalhe}>
        <Text style={estilos.tituloDetalhe}>{produto.title}</Text>
        <Text style={estilos.precoDetalhe}>R$ {produto.price}</Text>

        <Text style={estilos.tituloSecao}>Descrição</Text>
        <Text style={estilos.descricaoDetalhe}>{produto.description}</Text>
        <Text style={estilos.tituloSecao}>Categoria</Text>
        <Text style={estilos.descricaoDetalhe}>{produto.category}</Text>
      </View>

    </ScrollView>
  );
}
