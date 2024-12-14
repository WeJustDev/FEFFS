import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from '@/components/SignUpForm';
import LogoutButton from '@/components/LogoutButton';
import DownloadProfileButton from '@/components/DownloadProfilButton';
import DailyNews from '@/components/DailyNews';
import { useFocusEffect } from '@react-navigation/native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { IconSymbol } from '@/components/ui/IconSymbol';

type ColorScheme = 'light' | 'dark';

// Header component with logo and welcome text
const Header = ({ colorScheme }: { colorScheme: ColorScheme }) => {
  return (
    <ImageBackground source={require('@/assets/images/2414.jpg')} style={styles.header} accessible={true}
      accessibilityLabel="Arrière-plan de l'en-tête">
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel="Logo FEFFS"
        accessibilityRole="image"
      />
      <Text style={[styles.welcomeText, { color: Colors[colorScheme ?? 'light'].text }]} accessible={true}
        accessibilityRole="header"
        accessibilityLabel="Bienvenue sur l'application FEFFS">
        Bienvenue sur l'app FEFFS
      </Text>
    </ImageBackground>
  );
};

export default function Index() {
  const colorScheme = useColorScheme();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [psw, setPsw] = useState("");
  const [hasPass, setHasPass] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPass = await AsyncStorage.getItem('pass');

        if (storedName && storedEmail) {
          setName(storedName);
          setEmail(storedEmail);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }

        setHasPass(false);
      } catch (e) {
        setError('Erreur lors de la récupération des données utilisateur.');
      }
    };
    checkUser();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('firstname')
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('pass');
      await AsyncStorage.removeItem('program');
    } catch (e) {
      console.error('Erreur lors de la suppression des données utilisateur.', e);
    }
    setIsLoggedIn(false);
    setName('');
    setEmail('');
    setHasPass(false);
  };

  const handleBuy = () => {
    console.log('Acheter bouton pressé');
    // logique de redirect
  };


  if (isLoggedIn) {
    return (
      <ScrollView>
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].pageBg }]}>
          <Header colorScheme={colorScheme ?? 'light'} />
          <View style={styles.userInfoContainer}>
            <View
              style={[
                styles.profileCircle,
                { backgroundColor: Colors[colorScheme ?? 'light'].cardDarkBg },
              ]}
              accessible={false}
            >
              <Text style={[styles.profileInitial, { color: Colors[colorScheme ?? 'light'].text }]} accessible={false}>
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
        
            <View style={styles.profileInfo}>
              <Text
                style={[styles.profileName, { color: Colors[colorScheme ?? 'light'].headerText }]}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={`Nom d'utilisateur : ${name}`}
              >
                {name}
              </Text>
              <Text
                style={[styles.profileEmail, { color: Colors[colorScheme ?? 'light'].text }]}
                accessible={true}
                accessibilityRole="text"
                accessibilityLabel={`Email : ${email}`}
              >
                {email}
              </Text>
            </View>
          </View>
          <View style={[styles.accueil, { backgroundColor: Colors[colorScheme ?? 'light'].pageBg }]}>
            <View style={{ padding: 16 }}>
              <Text style={[styles.welcome, { color: Colors[colorScheme ?? 'light'].headerText }]} accessibilityLabel="Bienvenue" accessibilityRole='header'
                >
                Bienvenue !
              </Text>
              {/* Vérification du passe utilisateur */}
              <View style={[styles.passContainer, { backgroundColor: Colors[colorScheme ?? 'light'].cardDarkBg }]}>
                {hasPass ? (
                  <View style={styles.passContainerHas}>
                    <Text style={{ color: Colors[colorScheme ?? 'light'].headerText }}>Vous avez 1 passe actif</Text>
                    <TouchableOpacity
                      accessibilityLabel="Voir le passe"
                      accessibilityRole="button"  
                      accessibilityHint="Ce bouton vous permet de voir votre passe actif."
                      style={[styles.viewPassButton, { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }]}
                      onPress={() => console.log('Voir le passe')}
                    >
                      <Text style={[styles.viewPassText, { color: Colors[colorScheme ?? 'light'].dateTagText }]}>
                        Voir
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.noPassContainer}>
                      <Text style={[styles.nopasstext, { color: Colors[colorScheme ?? 'light'].text }]} accessibilityLabel="Vous n'avez encore acheté aucun passe pour l'instant." accessibilityRole='summary'>
                      Vous n'avez encore acheté aucun passe pour l'instant.
                    </Text>
                    <TouchableOpacity
                      accessibilityLabel="Acheter un passe"
                      accessibilityRole="button"
                      accessibilityHint="Ce bouton vous permet d'acheter un passe."
                      style={[styles.buyButton, { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }]}
                      onPress={handleBuy}
                    >
                      <Text style={[styles.buyButtonText, { color: Colors[colorScheme ?? 'light'].dateTagText }]}>
                        Acheter
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <DailyNews />
            {/* Ajout des boutons sous DailyNews */}

            <TouchableOpacity
          
              accessibilityLabel="Déconnexion"
              accessibilityRole="button"
              accessibilityHint='Ce bouton vous permet de vous déconnecter.'
              style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg, borderColor: Colors[colorScheme ?? 'light'].dateTagText, borderWidth: 1, },]}
              onPress={handleLogout}>
              <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].dateTagText }]} >
                Déconnexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return <SignUpScreen onLogin={handleLogin} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accueil: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 30,

  },
  welcomeText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 16,

    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 40,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 16,
  },
  viewPassButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewPassText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nbpass: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circlePass: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passContainerHas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure it takes full width
  },
  noPassContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 16,
  },
  buyButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nopasstext: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});