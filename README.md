
# TripHub: Registro de Viagens

Um aplicativo mobile desenvolvido com **React Native** e **Expo**, focado no registro, visualização e gerenciamento de viagens, utilizando autenticação, armazenamento no Firebase, seleção de datas e recursos nativos do dispositivo.

## 📋 Instruções do Projeto

O aplicativo foi desenvolvido com a seguinte estrutura:

- ✅ **Tela de Login** - Autenticação de usuário
- ✅ **Tela de Cadastro** - Registro de novos usuários
- ✅ **Dashboard Integrada** - Gerenciamento de viagens, permissões e recursos
- ✅ **Tela de Registro de Viagem** - Cadastro de viagens com foto, localização e data
- ✅ **Tela de Minhas Viagens** - Histórico de viagens realizadas
- ✅ **Componentes Reutilizáveis** - Botões, cards, mapa, câmera e calendário
- ✅ **Armazenamento no Firebase** - Persistência de dados e autenticação

## 🏗️ Estrutura do Projeto

```
mobile03/
├── app/
│   ├── _layout.tsx                # Layout principal com navegação
│   ├── index.tsx                  # Tela de login
│   ├── telaCadastro.tsx           # Tela de cadastro de usuários
│   ├── telaDashboardIntegrada.tsx # Dashboard com recursos integrados
│   ├── telaRegistroViagem.tsx     # Registro de viagens
│   ├── telaMinhasViagens.tsx      # Histórico de viagens
├── components/
│   ├── botaoLogin.js              # Botão de login
│   ├── botaoCadastro.js           # Botão de cadastro
│   ├── botaoSair.js               # Botão de sair
│   ├── botaoSalvar.js             # Botão de salvar
│   ├── card.js                    # Card reutilizável
│   ├── Mapa.tsx                   # Componente de mapa
│   ├── Camera.tsx                 # Componente de câmera
│   ├── Calendar.tsx               # Componente de calendário customizado
├── assets/                        # Imagens e ícones
├── styles/
│   └── style.js                   # Estilos globais
├── services/
│   ├── databaseService.js         # Serviço de banco de dados
│   ├── firebaseConfig.js          # Configuração do Firebase
│   ├── integracaoService.ts       # Integração de permissões e recursos
├── app.json                       # Configuração do Expo
├── package.json                   # Dependências
├── tsconfig.json                  # TypeScript
├── .env.example                   # Exemplo de variáveis de ambiente
├── README.md                      # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **React Native**
- **Expo**
- **Expo Router**
- **TypeScript**
- **Firebase**
- **AsyncStorage**
- **@react-native-community/datetimepicker**

### Dependências Principais

```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo": "~54.0.23",
  "expo-router": "~6.0.14",
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-native-community/datetimepicker": "^7.0.0",
  "firebase": "^10.8.0",
  "typescript": "~5.9.2"
}
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js e npm instalados
- Expo CLI instalado globalmente (`npm install -g expo-cli`)

### Instalação

1. Navegue até a pasta do projeto:
```bash
cd mobile03
```
2. Instale as dependências:
```bash
npm install
```
3. Configure o arquivo `.env` conforme `.env.example`

### Executar o Projeto

- **Iniciar o servidor Expo**:
```bash
npm start
```
- **Executar no Android**:
```bash
npm run android
```
- **Executar no iOS**:
```bash
npm run ios
```
- **Executar na Web**:
```bash
npm run web
```

## 📱 Componentes Principais

### Tela de Login
- Campo de email
- Campo de senha
- Botão de login
- Opção para cadastro

### Tela de Cadastro
- Registro de novos usuários
- Validação de dados
- Persistência no Firebase

### Dashboard Integrada
- Gerenciamento de viagens
- Permissões de câmera, localização e calendário
- Navegação para registro e histórico

### Tela de Registro de Viagem
- Captura foto
- Seleção de data via calendário
- Obtenção de localização
- Armazenamento no Firebase

### Tela de Minhas Viagens
- Listagem de viagens
- Exibição de detalhes

### Componentes Reutilizáveis
- Botões, cards, mapa, câmera, calendário

## 💾 Persistência de Dados

O aplicativo utiliza **Firebase** para:
- Armazenar dados de viagens
- Autenticação de usuários
- Persistência entre sessões

## 🎨 Estilos

Os estilos estão centralizados em `styles/style.js` para:
- Consistência visual
- Facilidade de manutenção
- Reutilização de estilos

## 📝 Notas de Desenvolvimento

- Layout responsivo
- Componentes reutilizáveis
- Tipagem TypeScript
- Uso de variáveis de ambiente
- Permissões nativas

## ✨ Funcionalidades Principais

- ✅ Cadastro e login
- ✅ Registro de viagem com foto, data e localização
- ✅ Dashboard integrada
- ✅ Histórico de viagens
- ✅ Permissões dinâmicas
- ✅ Componentes reutilizáveis
- ✅ Estrutura organizada

## 👨‍💻 Autor


Desenvolvido por Pedro Henrique Bomfim Wolski.
