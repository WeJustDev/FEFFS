import { StatusBar } from "expo-status-bar";
import { createTamagui, TamaguiProvider } from "tamagui";

// Import navigation router
import Navigation from "./assets/pages/Navigation"; 

// import .env variables
import { NNAPPID, NNAPPTOKEN } from '@env';

// import tailwindCSS
import "./assets/src/main.css";

// import Tamagui component 
import defaultConfig from "@tamagui/config/v3";
const config = createTamagui(defaultConfig);

// import nativeNotify
import registerNNPushToken from 'native-notify';

export default function App() {

  const appId = NNAPPID;
  const appToken = NNAPPTOKEN;
  registerNNPushToken(appId, appToken);

  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <Navigation />
    </TamaguiProvider>
  );
}
