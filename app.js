// Ponto de entrada do aplicativo
// registerRootComponent garante que o app funciona tanto no Expo Go quanto em builds standalone
import { registerRootComponent } from 'expo';
import AppNavigator from './src/navigator/appNavegation';

export default function App() {
  return <AppNavigator />;
}

registerRootComponent(App);