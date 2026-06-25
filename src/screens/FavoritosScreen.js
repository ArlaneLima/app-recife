// Tela de medicamentos favoritos salvos pelo usuário
// Busca os favoritos do backend e permite removê-los
// Recarrega automaticamente toda vez que o usuário entra na tela
import { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function FavoritosScreen() {

  // Lista de medicamentos favoritos
  const [favoritos, setFavoritos] = useState([]);

  // Controla o indicador de carregamento
  const [loading, setLoading] = useState(true);

  // useFocusEffect recarrega os favoritos toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  // Busca os favoritos salvos no backend via GET
  async function carregarFavoritos() {
    try {
      const response = await fetch('http://192.168.1.107:3000/favoritos');
      const data = await response.json();
      setFavoritos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // Remove um favorito do backend via DELETE e atualiza a lista local
  async function removerFavorito(id) {
    Alert.alert(
      'Remover favorito',
      'Deseja remover este medicamento dos favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              // Envia requisição DELETE para o backend
              await fetch(`http://192.168.1.107:3000/favoritos/${id}`, {
                method: 'DELETE'
              });

              // Remove o item da lista local sem precisar recarregar tudo
              setFavoritos(prev => prev.filter(f => f.id !== id));
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  }

  // Exibe indicador de carregamento enquanto busca os dados
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3a9bd5" />
        <Text style={styles.loadingTexto}>Carregando favoritos...</Text>
      </View>
    );
  }

  // Exibe mensagem quando não há favoritos salvos
  if (favoritos.length === 0) {
    return (
      <View style={styles.vazioContainer}>
        <Text style={styles.vazioEmoji}>⭐</Text>
        <Text style={styles.vazioTitulo}>Nenhum favorito ainda</Text>
        <Text style={styles.vazioSubtitulo}>
          Na tela de Medicamentos, toque em ⭐ para salvar um medicamento aqui.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      data={favoritos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>

          <View style={styles.cardHeader}>
            <Text style={styles.nome}>💊 {item.produto}</Text>

            {/* Botão para remover o medicamento dos favoritos */}
            <TouchableOpacity onPress={() => removerFavorito(item.id)}>
              <Text style={styles.remover}>🗑️</Text>
            </TouchableOpacity>
          </View>

          {/* Informações detalhadas do medicamento favorito */}
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
  );
}

const styles = StyleSheet.create({
  lista: {
    backgroundColor: '#ADD0FF',
    padding: 12,
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

  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD0FF',
    padding: 32,
    gap: 12,
  },

  vazioEmoji: {
    fontSize: 48,
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a7d6f',
    textAlign: 'center',
  },

  vazioSubtitulo: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
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

  remover: {
    fontSize: 18,
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