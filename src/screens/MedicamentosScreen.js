// Tela de listagem de medicamentos disponíveis nas unidades de saúde do Recife
// Consome dados da API do Portal de Dados Abertos da Cidade do Recife via backend
// Permite busca por nome e salvar medicamentos como favoritos
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function MedicamentosScreen() {

  // Lista completa de medicamentos retornada pela API
  const [medicamentos, setMedicamentos] = useState([]);

  // Lista filtrada pela barra de busca
  const [filtrados, setFiltrados] = useState([]);

  // Controla o indicador de carregamento
  const [loading, setLoading] = useState(true);

  // Texto digitado na barra de busca
  const [busca, setBusca] = useState('');

  // Carrega os medicamentos ao montar o componente
  useEffect(() => {
    carregarMedicamentos();
  }, []);

  // Busca os medicamentos no backend, que por sua vez consulta a API do Dados Recife
  async function carregarMedicamentos() {
    try {
      const response = await fetch('http://192.168.1.107:3000/medicamentos');
      const data = await response.json();

      // Armazena tanto a lista completa quanto a lista filtrada
      setMedicamentos(data);
      setFiltrados(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Filtra os medicamentos pelo nome conforme o usuário digita
  function handleBusca(texto) {
    setBusca(texto);
    const resultado = medicamentos.filter(item =>
      item.produto?.toLowerCase().includes(texto.toLowerCase())
    );
    setFiltrados(resultado);
  }

  // Salva um medicamento como favorito enviando para o backend via POST
  async function salvarFavorito(item) {
    try {
      await fetch('http://192.168.1.107:3000/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      Alert.alert('✅ Salvo!', `${item.produto} adicionado aos favoritos.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Exibe indicador de carregamento enquanto busca os dados
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3a9bd5" />
        <Text style={styles.loadingTexto}>Carregando medicamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Barra de busca para filtrar medicamentos por nome */}
      <TextInput
        style={styles.busca}
        placeholder="🔍 Buscar medicamento..."
        placeholderTextColor="#aaa"
        value={busca}
        onChangeText={handleBusca}
      />

      {/* Lista de medicamentos com FlatList para melhor performance */}
      <FlatList
        data={filtrados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View style={styles.cardHeader}>
              <Text style={styles.nome}>💊 {item.produto}</Text>

              {/* Botão para adicionar o medicamento aos favoritos */}
              <TouchableOpacity onPress={() => salvarFavorito(item)}>
                <Text style={styles.estrela}>⭐</Text>
              </TouchableOpacity>
            </View>

            {/* Informações detalhadas do medicamento */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>Unidade</Text>
              <Text style={styles.valor}>{item.unidade}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Classe</Text>
              <Text style={styles.valor}>{item.classe}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Apresentação</Text>
              <Text style={styles.valor}>{item.apresentacao}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Quantidade</Text>
              <Text style={styles.valor}>{item.quantidade}</Text>
            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD0FF',
    padding: 12,
  },

  busca: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d0eae4',
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD0FF',
    gap: 12,
  },

  loadingTexto: {
    color: '#5a8fa3',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  nome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2a7d6f',
    flex: 1,
    marginRight: 8,
  },

  estrela: {
    fontSize: 20,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f4f1',
  },

  label: {
    fontSize: 13,
    color: '#5a8fa3',
    fontWeight: '600',
  },

  valor: {
    fontSize: 13,
    color: '#444',
    flexShrink: 1,
    textAlign: 'right',
    marginLeft: 8,
  },
});