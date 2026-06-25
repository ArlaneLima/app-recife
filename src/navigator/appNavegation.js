// Arquivo de navegação principal do app
// Utiliza Bottom Tab Navigator para exibir as abas na parte inferior da tela
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LocationScreen from '../screens/LocationScreen';
import MedicamentosScreen from '../screens/MedicamentosScreen';
import FavoritosScreen from '../screens/FavoritosScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    // NavigationContainer é o container principal que gerencia o estado de navegação
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          // Estilo da barra de abas inferior
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopColor: '#e8f4f1',
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#2a7d6f',   // cor da aba ativa
          tabBarInactiveTintColor: '#aaa',     // cor das abas inativas
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: '#2a7d6f',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Tela de localização do usuário */}
        <Tab.Screen
          name="Location"
          component={LocationScreen}
          options={{
            title: 'Minha Localização',
            tabBarLabel: 'Localização',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" color={color} size={size} />
            ),
          }}
        />

        {/* Tela de listagem de medicamentos da API do Dados Recife */}
        <Tab.Screen
          name="Medicamentos"
          component={MedicamentosScreen}
          options={{
            title: 'Medicamentos',
            tabBarLabel: 'Medicamentos',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medkit" color={color} size={size} />
            ),
          }}
        />

        {/* Tela de medicamentos favoritos salvos pelo usuário */}
        <Tab.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{
            title: 'Favoritos',
            tabBarLabel: 'Favoritos',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}