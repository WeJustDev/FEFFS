import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('user_data');
        if (data) {
          setUserData(JSON.parse(data));
        } else {
          // Si aucune donnée, rediriger vers la page d'inscription
          router.replace('/signup');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return null; // Affiche un écran vide pendant le chargement
  }

  if (!userData) {
    return null; // Ne montre rien si redirection vers `/signup`
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Bienvenue, {userData.username}!
      </Text>
      <Text>Email : {userData.email}</Text>
      <Button
        title="Se déconnecter"
        onPress={async () => {
          await AsyncStorage.removeItem('user_data');
          router.replace('/signup'); // Rediriger vers la page d'inscription
        }}
      />
    </View>
  );
}
