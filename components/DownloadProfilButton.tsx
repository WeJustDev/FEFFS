import React from 'react';
import { Button, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface DownloadProfileButtonProps {
  name: string;
  email: string;
  onError: (error: string) => void;
}

const DownloadProfileButton: React.FC<DownloadProfileButtonProps> = ({ name, email, onError }) => {
  const handleDownloadProfile = async () => {
    const profile = {
      name,
      email,
    };

    if (Platform.OS === 'web') {
      // On web platform
      const fileName = 'profile.json';
      const json = JSON.stringify(profile, null, 2);
      const blob = new Blob([json], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
    } else {
      // On native platforms
      const path = `${FileSystem.documentDirectory}profile.json`;
      try {
        await FileSystem.writeAsStringAsync(path, JSON.stringify(profile));
        await Sharing.shareAsync(path, {
          mimeType: 'application/json',
          dialogTitle: 'Mon profil',
          UTI: 'public.json',
        });
      } catch (error) {
        console.log('Erreur lors du téléchargement du profil:', error);
        onError("Erreur lors du téléchargement du profil.");
      }
    }
  };

  return <Button title="Extraire mes informations" onPress={handleDownloadProfile} />;
};

export default DownloadProfileButton;