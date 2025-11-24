import { Stack } from "expo-router";


export default function RootLayout(){
    return(
        <Stack screenOptions={ { headerShown: false } }>
            <Stack.Screen name="index" options={{ title: 'Tela login'}} />
            <Stack.Screen name="telaCadastro" options={{ title: 'Tela cadastro'}} />
            <Stack.Screen name="telaDashboardIntegrada" options={{ title: 'Dashboard com Recursos'}} />
            <Stack.Screen name="telaRegistroViagem" options={{ title: 'Registrar Viagem'}} />
            <Stack.Screen name="telaMinhasViagens" options={{ title: 'Minhas Viagens'}} />
        </Stack>
    )
}