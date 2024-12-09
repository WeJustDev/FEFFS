import { StatusBar } from 'expo-status-bar';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { Slot, useRouter } from 'expo-router';

// Import navigation router
import Navigation from "./assets/pages/Navigation"; 

// Importez vos variables d'environnement
import { NNAPPID, NNAPPTOKEN } from '@env';

// Importez votre fichier CSS Tailwind
import './assets/src/main.css';

// import Tamagui component library
import { createTamagui,TamaguiProvider } from 'tamagui'
import defaultConfig from '@tamagui/config/v3'
import { Button } from 'tamagui'
import Nav from "./assets/components/ui/nav";

const config = createTamagui(defaultConfig)

// Importez Native Notify
import registerNNPushToken from 'native-notify';

export default function App() {
  const appId = NNAPPID;
  const appToken = NNAPPTOKEN;
  registerNNPushToken(appId, appToken);

  return (
    <TamaguiProvider config={config}>
      <View className='flex-1 justify-center items-center bg-neutral-900 text-white'>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style='auto' />
        <Button>Lorem ipsum</Button>
        <Nav />
      </View>
      <StatusBar style="auto" />
      <Slot /> {/* Ce composant gère le rendu des routes */}
    </TamaguiProvider>
  );
}
