# App Recife — Medicamentos & Localização

Desenvolvido por **Ludmilla Arlane de Oliveira Dias Lima**

---

## Sobre o Projeto

Aplicativo mobile desenvolvido em **React Native com Expo** como atividade final da disciplina de Desenvolvimento Mobile. O app consome dados abertos do **Portal de Dados Abertos da Cidade do Recife** e integra rastreamento de localização em tempo real do usuário, além de permitir salvar medicamentos favoritos.

---

## Justificativa da API

Foi escolhida a API de **Medicamentos das Unidades de Saúde do Recife**, disponível no Portal de Dados Abertos da Cidade do Recife. A escolha foi motivada pelo objetivo de facilitar o acesso da população aos medicamentos disponíveis nas unidades de saúde do Recife, permitindo que o usuário consulte rapidamente quais remédios estão disponíveis e em quais unidades. A funcionalidade de favoritos foi adicionada pensando especialmente em idosos e pessoas que tomam medicamentos de uso contínuo, permitindo salvar os remédios mais consultados para acesso rápido.

**API utilizada:**
```
https://dados.recife.pe.gov.br/api/action/datastore_search?resource_id=537f0b95-4eb7-4912-9d7c-32caf9fd68ac&limit=250
```

---

##  Estrutura do Projeto

```
app-Recife/
├── app-recife/          # Aplicativo React Native (Expo)
│   ├── app.js           # Ponto de entrada do app
│   ├── src/
│   │   ├── navigator/
│   │   │   └── appNavegation.js      # Navegação por abas (Bottom Tabs)
│   │   ├── screens/
│   │   │   ├── LocationScreen.js     # Tela de localização em tempo real
│   │   │   ├── MedicamentosScreen.js # Tela de medicamentos com busca e favoritos
│   │   │   └── FavoritosScreen.js    # Tela de medicamentos favoritos salvos
│   │   └── services/
│   │       └── api.js                # Configuração base da API
│   └── package.json
│
└── backend/             # Servidor Node.js + Express
    ├── server.js        # Configuração do servidor
    ├── routes/
    │   ├── localizacaoRoutes.js   # Rotas GET e POST de localização
    │   ├── medicamentosRoutes.js  # Rota GET de medicamentos (Dados Recife)
    │   └── favoritosRoutes.js     # Rotas GET, POST e DELETE de favoritos
    ├── controllers/
    │   └── localizacaoController.js
    ├── data/
    │   ├── localizacoes.json      # Persistência das localizações
    │   └── favoritos.json         # Persistência dos favoritos
    └── package.json
```

---

##  Funcionalidades

-  **Rastreamento de localização em tempo real** com atualização a cada 3 segundos ou 5 metros de deslocamento
-  **Persistência da localização** do usuário no backend automaticamente
-  **Listagem de medicamentos** disponíveis nas unidades de saúde do Recife
-  **Busca de medicamentos** por nome em tempo real
-  **Favoritos** — salva medicamentos de uso contínuo para acesso rápido
-  **Remoção de favoritos** com confirmação
-  **Navegação por abas** na parte inferior da tela

---

##  Tecnologias Utilizadas

**Frontend (App):**
- React Native + Expo
- expo-location
- @react-navigation/native
- @react-navigation/bottom-tabs

**Backend:**
- Node.js
- Express
- CORS

---

## Como Executar Localmente

### Pré-requisitos
- Node.js instalado
- Expo Go instalado no celular
- Celular e PC na mesma rede Wi-Fi

---

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/app-recife.git
cd app-Recife
```

---

### 2. Descobrir o IP da sua máquina

No terminal, execute:
```bash
ipconfig
```
Anote o **Endereço IPv4** (ex: `192.168.1.101`).

---

### 3. Atualizar o IP no código

Substitua o IP nos seguintes arquivos pelo seu IP atual:

- `app-recife/src/screens/MedicamentosScreen.js`
- `app-recife/src/screens/LocationScreen.js`
- `app-recife/src/screens/FavoritosScreen.js`

---

### 4. Rodar o Backend

```bash
cd backend
npm install
node server.js
```

O terminal deve exibir:
```
Servidor rodando na porta 3000
```

---

### 5. Rodar o App

Abra um **novo terminal**:
```bash
cd app-recife
npm install
npx expo start --clear --lan
```

Escaneie o QR Code com o Expo Go no celular.

---

##  Rotas do Backend

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/medicamentos` | Busca medicamentos da API do Dados Recife |
| GET | `/localizacoes` | Lista todas as localizações salvas |
| POST | `/localizacoes` | Salva a localização atual do usuário |
| GET | `/favoritos` | Lista todos os medicamentos favoritos |
| POST | `/favoritos` | Salva um medicamento como favorito |
| DELETE | `/favoritos/:id` | Remove um medicamento dos favoritos |

---

## Fonte dos Dados

[Portal de Dados Abertos da Cidade do Recife](https://dados.recife.pe.gov.br)
