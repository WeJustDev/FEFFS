import { useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type ImgPickerProps = {
  onImageSelected: (uri: string | null) => void;
};

export function ImgPicker({ onImageSelected }: ImgPickerProps) {
  const [image, setImage] = useState<string | null>(null);
  const colorScheme = useColorScheme();

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
      onImageSelected(uri); // Notify the parent about the selected image
    } else {
      onImageSelected(null); // Notify the parent no image was selected
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }]}
        onPress={pickImage}
      >
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].dateTagText }]}>
          Charger une image de votre tête
        </Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 10,
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
