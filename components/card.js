import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import estilos from "../styles/style";

export default function Card({ data }) {
    const navigation = useNavigation();

    return (
        <View style={estilos.card}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={estilos.itemCard}
                        onPress={() => navigation.navigate("telaDetalhes", { produto: item })}
                    >
                        <Image 
                            source={{ uri: item.image }} 
                            style={estilos.imageCard}
                        />
                        <Text style={estilos.cor}>{item.title}</Text>
                        <Text style={estilos.cor}>R$ {item.price}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
