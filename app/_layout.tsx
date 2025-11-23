import { Stack } from "expo-router";


export default function RootLayout(){
    return(
        <Stack screenOptions={ { headerShown: false } }>
            <Stack.Screen name="index" options={{ title: 'Tela login'}} />
            <Stack.Screen name="telaCadastro" options={{ title: 'Tela cadastro'}} />
            <Stack.Screen name="telaDashboard" options={{ title: 'Tela dashboard'}} />
            <Stack.Screen name="telaDetalhes" options={{ title: 'Tela detalhes'}} />
        </Stack>
    )
}