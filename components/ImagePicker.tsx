import { useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ImgPickerProps = {
  onImageSelected: (base64: string | null) => void;
};

export function ImgPicker({ onImageSelected }: ImgPickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  const convertImageToBase64 = async (uri: string): Promise<string | null> => {
    try {
      // Fetch the image
      const response = await fetch(uri);
      const blob = await response.blob();

      // Convert blob to base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      
      // Convert image to base64
      const base64Image = await convertImageToBase64(uri);
      onImageSelected(base64Image);
    } else {
      setImage(null);
      onImageSelected(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }]}
        onPress={pickImage}
      >
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].dateTagText }]}>
          Charger une image de votre tête
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});