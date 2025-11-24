# mobile03

Aplicativo de registro e gerenciamento de viagens.

## Autor
Pedro Henrique Bomfim Wolski

## Descrição
Este app permite ao usuário registrar viagens, capturar fotos, marcar datas, visualizar eventos e gerenciar permissões de localização, câmera e calendário. Utiliza Firebase para autenticação e armazenamento, e integra recursos nativos do dispositivo.

## Funcionalidades
- Registro de viagens com foto, localização e data
- Visualização de viagens realizadas
- Seleção de data via calendário customizado
- Autenticação de usuário
- Persistência de dados no Firebase
- Permissões dinâmicas para recursos do dispositivo

## Instalação
1. Clone o repositório:
   ```
   git clone https://github.com/IamPdrin/mobile03.git
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env` (veja `.env.example`)
4. Execute o app:
   ```
   npx expo start
   ```

## Configuração do Firebase
Preencha o arquivo `.env` com suas credenciais do Firebase conforme o exemplo em `.env.example`.

## Observações
- O app utiliza Expo, React Native, Firebase e diversos recursos nativos.
- Para rodar em outros dispositivos, basta configurar o `.env` e instalar as dependências.

## Licença
MIT
