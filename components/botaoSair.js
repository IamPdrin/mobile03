import React from "react";
import { TouchableOpacity, Text } from "react-native";
import estilos from "../styles/style";

export default function BotaoSair({ titulo, onPress, cor }) {
  return (
    <TouchableOpacity style={[estilos.botaoSair, { backgroundColor: cor }]} onPress={onPress}>
      <Text style={estilos.textoBotaoSair}>{titulo}</Text>
    </TouchableOpacity>
  );
}
