// Tela de rastreamento de localização em tempo real do usuário
// Utiliza expo-location para obter as coordenadas geográficas do dispositivo
// e salva automaticamente no backend a cada atualização
import { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen({ navigation }) {

  // Estado para armazenar as coordenadas atuais
  const [location, setLocation] = useState(null);

  // Referência para o watcher de localização (permite parar o rastreamento ao sair da tela)
  const watchRef = useRef(null);

  useEffect(() => {
    // Inicia o rastreamento ao montar o componente
    iniciarRastreamento();

    // Função de limpeza: para o rastreamento ao desmontar o componente
    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
      }
    };
  }, []);

  // Solicita permissão e inicia o rastreamento contínuo de localização
  async function iniciarRastreamento() {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    // Verifica se a permissão foi concedida
    if (status !== 'granted') {
      alert('Permissão negada');
      return;
    }

    // watchPositionAsync atualiza a localização a cada 3 segundos ou 5 metros de movimento
    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High, // alta precisão do GPS
        timeInterval: 3000,               // atualiza a cada 3 segundos
        distanceInterval: 5,              // ou a cada 5 metros de deslocamento
      },
      async (novaLocalizacao) => {
        const coords = novaLocalizacao.coords;

        // Atualiza o estado com as novas coordenadas
        setLocation(coords);

        // Salva a localização no backend
        await salvarLocalizacao(coords);
      }
    );
  }

  // Envia as coordenadas para o backend via POST
  async function salvarLocalizacao(coords) {
    try {
      await fetch('http://192.168.1.107:3000/localizacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      });
    } catch (error) {
      console.log('Erro ao salvar localização:', error);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.titulo}>📍 Minha Localização</Text>
        <Text style={styles.subtitulo}>Rastreamento em tempo real</Text>

        {/* Exibe mensagem de carregamento enquanto obtém a localização */}
        {!location ? (
          <Text style={styles.aguardando}>Obtendo localização...</Text>
        ) : (
          <>
            {/* Exibe latitude, longitude e precisão do GPS */}
            <View style={styles.coordRow}>
              <Text style={styles.label}>Latitude</Text>
              <Text style={styles.valor}>{location.latitude.toFixed(6)}</Text>
            </View>

            <View style={styles.coordRow}>
              <Text style={styles.label}>Longitude</Text>
              <Text style={styles.valor}>{location.longitude.toFixed(6)}</Text>
            </View>

            <View style={styles.coordRow}>
              <Text style={styles.label}>Precisão</Text>
              <Text style={styles.valor}>{location.accuracy?.toFixed(1)} m</Text>
            </View>
          </>
        )}
      </View>

      {/* Botão de navegação para a tela de medicamentos */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Medicamentos')}
      >
        <Text style={styles.botaoTexto}>Ver Medicamentos 💊</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD0FF',
    padding: 24,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a7d6f',
    marginBottom: 4,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 13,
    color: '#5a8fa3',
    textAlign: 'center',
    marginBottom: 20,
  },

  aguardando: {
    color: '#888',
    textAlign: 'center',
    fontSize: 15,
  },

  coordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f4f1',
  },

  label: {
    fontSize: 15,
    color: '#5a8fa3',
    fontWeight: '600',
  },

  valor: {
    fontSize: 15,
    color: '#333',
  },

  botao: {
    backgroundColor: '#3a9bd5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});