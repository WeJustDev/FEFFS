import { StatusBar } from 'expo-status-bar';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { Slot, useRouter } from 'expo-router';

// Importez vos variables d'environnement
import { NNAPPID, NNAPPTOKEN } from '@env';

// Importez votre fichier CSS Tailwind
import './assets/src/main.css';

// Importez la configuration Tamagui
import defaultConfig from '@tamagui/config/v3';
const config = createTamagui(defaultConfig);

// Importez Native Notify
import registerNNPushToken from 'native-notify';

export default function App() {
  const appId = NNAPPID;
  const appToken = NNAPPTOKEN;
  registerNNPushToken(appId, appToken);

  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <Slot /> {/* Ce composant gère le rendu des routes */}
    </TamaguiProvider>
  );
}
