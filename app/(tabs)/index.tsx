import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SignUpScreen from '@/components/SignUpForm';
import LogoutButton from '@/components/LogoutButton';
import DownloadProfileButton from '@/components/DownloadProfilButton';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    useEffect(() => {
      const checkUser = async () => {
        const storedName = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedName && storedEmail) {
          setName(storedName);
          setEmail(storedEmail);
        }
      };
      checkUser();
    }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    setEmail('');
  };

  if (isLoggedIn) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
          />
        }>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Accueil</Text>
          <Text style={{ fontSize: 16, color: '#fff' }}> - Bienvenue {name} !</Text>
          <LogoutButton onLogout={handleLogout} />
          <DownloadProfileButton name={name} email={email} onError={setError} />
        </View>
      </ParallaxScrollView>
    );
  }

  return <SignUpScreen onLogin={handleLogin} />;
}