import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const formPosition = useRef(new Animated.Value(800)).current; // Position initiale hors de l'écran

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkUser = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedName && storedEmail) {
        setName(storedName);
        setEmail(storedEmail);
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, []);

  // Gérer l'animation du formulaire
  const handleStart = () => {
    Animated.timing(formPosition, {
      toValue: 0, // Amène le formulaire dans la vue
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Gérer l'inscription
  const handleSignUp = async () => {
    if (!name || !email) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez entrer un email valide.');
      return;
    }

    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      setIsLoggedIn(true);
      setError(null);
    } catch (error) {
      setError('Erreur lors de l\'enregistrement.');
    }
  };

  // Gérer la déconnexion
  const handleLogout = async () => {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    setIsLoggedIn(false);
    setName('');
    setEmail('');
  };

  // Si l'utilisateur est connecté, afficher un message de bienvenue
  if (isLoggedIn) {
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
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Accueil</Text>
          <Button title="Déconnexion" onPress={handleLogout} />
        </View>
      </ParallaxScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {/* Section supérieure avec le logo et bouton Commencer */}
      <View style={styles.topSection}>
        <Text style={styles.logo}>Votre Logo</Text>
        <Text style={styles.tagline}>
          Simplifiez votre expérience, inscrivez-vous rapidement.
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Commencer</Text>
        </TouchableOpacity>
      </View>

      {/* Formulaire animé */}
      <Animated.View
        style={[styles.formContainer, { transform: [{ translateY: formPosition }] }]}>
        <Text style={styles.formTitle}>Créer un compte</Text>
        <Text style={styles.formSubtitle}>Inscrivez-vous pour continuer</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          placeholder="Nom"
          style={styles.input}
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
          <Text style={styles.submitButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F75C03', // Couleur orange du background
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#00C851', // Couleur verte pour le bouton
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});