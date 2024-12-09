import { Image, StyleSheet, Vibration, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {

  const [selectedLink, setSelectedLink] = useState("Accueil");
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

  interface Link {
    name: string;
    icon: string;
  }

  const links: Link[] = [
    { name: 'Accueil', icon: '<p>test</p>' },
    { name: 'Programmation', icon: '<p>test</p>' },
    { name: 'Billets', icon: '<p>test</p>' },
  ];

  const secondaryLinks: Link[] = [
    { name: 'Mes billets', icon: '<p>test</p>'},
    { name: 'QR Code', icon: '<p>test</p>'},
  ];

  const handlePress = (name: string): void => {
    Vibration.vibrate(50); 
    setSelectedLink(name);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Accueil</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
