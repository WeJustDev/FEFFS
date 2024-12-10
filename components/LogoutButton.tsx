import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    onLogout();
  };

  return <Button title="Déconnexion" onPress={handleLogout} />;
};

export default LogoutButton;