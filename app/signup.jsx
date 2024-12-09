// app/signup.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('user_data');
        if (data) {
          console.log('Données existantes :', JSON.parse(data));
          router.replace('/');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) {
    return null;
  }

  const handleSignup = async () => {
    if (!username || !email) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const userData = { username, email };

    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
      console.log('Données utilisateur enregistrées :', userData);
      router.replace('/');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des données :", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Inscription</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          width: '80%',
        }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 20,
          width: '80%',
        }}
        keyboardType="email-address"
      />
      <Button title="Créer" onPress={handleSignup} />
    </View>
  );
}