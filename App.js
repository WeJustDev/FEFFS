import { StatusBar } from "expo-status-bar";
import { createTamagui, TamaguiProvider } from "tamagui";

import "./assets/src/main.css"

import defaultConfig from "@tamagui/config/v3";
import Navigation from "./assets/pages/Navigation"; // Import du gestionnaire de navigation

const config = createTamagui(defaultConfig);

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="auto" />
      <Navigation />
    </TamaguiProvider>
  );
}
