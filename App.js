import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

// import tailwindCSS
import "./assets/src/main.css";

// import Tamagui component library
import { createTamagui,TamaguiProvider } from 'tamagui'
import defaultConfig from '@tamagui/config/v3'
import { Button } from 'tamagui'

const config = createTamagui(defaultConfig)

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <View className='flex-1 justify-center items-center bg-red-600'>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style='auto' />
        <Button>Lorem ipsum</Button>
      </View>
    </TamaguiProvider>
  );
}
