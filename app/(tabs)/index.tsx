import React, { useState, useEffect } from 'react';
import { View, Text, Image, Platform, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from '@/components/SignUpForm';
import LogoutButton from '@/components/LogoutButton';
import DownloadProfileButton from '@/components/DownloadProfilButton';
import DailyNews from '@/components/DailyNews';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Header Personnalisé</Text>
  </View>
);

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
      <ScrollView>   
        <View style={{ width: '100%' }}>
          <Header />
          <View style={{ flexDirection: 'row', justifyContent:'space-between', width: '100%' }}>
            <LogoutButton onLogout={handleLogout} style={{ width: '100%', marginBottom: 10 }} />
            <DownloadProfileButton name={name} email={email} onError={setError} style={{ width: '100%' }} />
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Accueil</Text>
          <Text style={{ fontSize: 16, color: '#fff' }}> - Bienvenue {name} !</Text>
        
          <DailyNews />
        </View>
      </ScrollView>
    );
  }

  return <SignUpScreen onLogin={handleLogin} />;
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});