import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const Thankyou: React.FC = () => {
  const colorScheme = useColorScheme();
  
  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].pageBg }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].headerText }]}>
        Merci pour votre achat !
      </Text>
      <Text style={[styles.description, { color: Colors[colorScheme ?? 'light'].headerText }]}>
        Nous espérons que vous profiterez pleinement de votre pass pour le Festival Européen du Film Fantastique.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 25,
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Thankyou;