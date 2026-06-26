#  App Recife 

Desenvolvido por **Ludmilla Arlane de Oliveira Dias Lima**

---

## Sobre o App

Aplicativo mobile desenvolvido em **React Native com Expo** como atividade final da disciplina de Desenvolvimento Mobile. O app consome dados abertos do **Portal de Dados Abertos da Cidade do Recife**, exibe medicamentos disponíveis nas unidades de saúde, rastreia a localização do usuário em tempo real e permite salvar medicamentos favoritos.

---

## Justificativa da API

Foi escolhida a API de **Medicamentos das Unidades de Saúde do Recife**. A escolha foi motivada pelo objetivo de facilitar o acesso da população aos medicamentos disponíveis nas unidades de saúde do Recife. A funcionalidade de favoritos foi adicionada pensando especialmente em idosos e pessoas que tomam medicamentos de uso contínuo, permitindo salvar os remédios mais consultados para acesso rápido.

---

##  Estrutura do Projeto

```
app-recife/
├── app.js                        # Ponto de entrada do app
├── src/
│   ├── navigator/
│   │   └── appNavegation.js      # Navegação por abas (Bottom Tabs)
│   ├── screens/
│   │   ├── LocationScreen.js     # Tela de localização em tempo real
│   │   ├── MedicamentosScreen.js # Tela de medicamentos com busca e favoritos
│   │   └── FavoritosScreen.js    # Tela de medicamentos favoritos salvos
│   └── services/
│       └── api.js                # Configuração base da API
└── package.json
```

---

## Funcionalidades

-  **Rastreamento de localização em tempo real** com atualização a cada 3 segundos
-  **Persistência da localização** no backend automaticamente
-  **Listagem de medicamentos** disponíveis nas unidades de saúde do Recife
-  **Busca de medicamentos** por nome em tempo real
-  **Favoritos** — salva medicamentos de uso contínuo para acesso rápido
-  **Remoção de favoritos** com confirmação
-  **Navegação por abas** na parte inferior da tela

---

##  Tecnologias Utilizadas

- React Native + Expo
- expo-location
- @react-navigation/native
- @react-navigation/bottom-tabs

---

##  Como Executar Localmente

### Pré-requisitos
- Node.js instalado
- Expo Go instalado no celular
- Celular e PC na mesma rede Wi-Fi
- Backend rodando (ver repositório do backend)

---

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/app-recife.git
cd app-recife
```

---

### 2. Instalar as dependências

```bash
npm install
```

---

### 3. Descobrir o IP da sua máquina

No terminal, execute:
```bash
ipconfig
```
Anote o **Endereço IPv4** (ex: `192.168.1.101`).

---

### 4. Atualizar o IP no código

Substitua o IP nos seguintes arquivos pelo seu IP atual:

- `src/screens/LocationScreen.js`
- `src/screens/MedicamentosScreen.js`
- `src/screens/FavoritosScreen.js`

---

### 5. Iniciar o app

```bash
npx expo start --clear --lan
```

Escaneie o QR Code com o **Expo Go** no celular.

---

##  Observação

O backend precisa estar rodando antes de abrir o app. Sem o backend, as telas de Medicamentos e Favoritos não carregarão dados.

---

##  Fonte dos Dados

[Portal de Dados Abertos da Cidade do Recife](https://dados.recife.pe.gov.br)
