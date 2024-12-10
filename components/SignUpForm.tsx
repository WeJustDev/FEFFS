import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Platform,
    Image,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ onLogin }: { onLogin: () => void }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const formPosition = useRef(new Animated.Value(800)).current;

    useEffect(() => {
        const checkUser = async () => {
            const storedName = await AsyncStorage.getItem('name');
            const storedEmail = await AsyncStorage.getItem('email');
            if (storedName && storedEmail) {
                setName(storedName);
                setEmail(storedEmail);
                onLogin();
            }
        };
        checkUser();
    }, []);

    // Gérer l'animation du formulaire
    const handleStart = () => {
        setIsFormVisible(true);
        Animated.timing(formPosition, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleCloseForm = () => {
        Animated.timing(formPosition, {
            toValue: 800,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setIsFormVisible(false);
        });
    }

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
            onLogin();
            setError(null);
        } catch (error) {
            setError('Erreur lors de l\'enregistrement.');
        }
    };

    // Gérer l'importation du profil
    const handleImportProfile = async () => {
        console.log('handleImportProfile a été appelé');
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
            });
            console.log('Résultat du DocumentPicker :', result);

            if (result.canceled) {
                console.log("L'utilisateur a annulé la sélection du document.");
                return;
            }

            if (result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                console.log('URI du fichier sélectionné :', uri);

                const response = await fetch(uri);
                const fileContent = await response.text();
                console.log('Contenu du fichier :', fileContent);

                const profile = JSON.parse(fileContent);
                console.log('Profil importé :', profile);
                if (profile.name && profile.email) {
                    setName(profile.name);
                    setEmail(profile.email);
                    console.log('Profil importé avec succès', profile.name, profile.email);

                    // Enregistrer dans AsyncStorage
                    await AsyncStorage.setItem('name', profile.name);
                    await AsyncStorage.setItem('email', profile.email);

                    // Appeler onLogin pour rediriger vers la page principale
                    onLogin();
                } else {
                    setError('Le fichier ne contient pas de données valides.');
                    console.log('Données du profil invalides');
                }
            } else {
                setError('Aucun fichier sélectionné.');
                console.log('Aucun fichier sélectionné.');
            }
        } catch (error) {
            setError('Erreur lors de l\'importation du profil.');
            console.error('Erreur lors de l\'importation du profil :', error);
        }
    };

        return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={{
            width: '20%',
            height: '11%',
            borderRadius: 50,
            marginBottom: 20,
            shadowColor: '#fff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 25,
            elevation: 10, // Pour Android
            overflow: 'hidden', // Pour s'assurer que l'image respecte les bordures arrondies
          }}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={require('@/assets/images/logo.png')}
            />
          </View>
          <Text style={styles.tagline}>
            Simplifiez votre expérience, inscrivez-vous rapidement.
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Commencer</Text>
          </TouchableOpacity>
    
          {/* Nouveau bouton "Importer mon profil" */}
          <TouchableOpacity style={styles.importButton} onPress={handleImportProfile}>
            <Text style={styles.importButtonText}>Importer mon profil</Text>
          </TouchableOpacity>
        </View>
    
        {/* Formulaire animé */}
        {isFormVisible && (
          <Animated.View
            style={[styles.formContainer, { transform: [{ translateY: formPosition }] }]}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseForm}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
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
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',
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
        backgroundColor: 'rgba(206, 90, 75, 0.3)',
  
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
        color: 'rgba(206, 90, 75, 1)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    importButton: {
        borderStyle: 'solid',
        borderColor: 'rgba(206, 90, 75, 0.5)', // Jaune pour le bouton d'importation
        backgroundColor: 'rgba(206, 90, 75, 0.05)',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginTop: 10,
    },
    importButtonText: {
        color: 'rgba(206, 90, 75, 1)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    formContainer: {
        position: 'absolute',
        bottom: 45,
        width: '100%',
        backgroundColor: '#262626',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        elevation: 10,
        overflow: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        boxShadow: '-320 -22px 75px rgba(206, 90, 75, 1)',
        padding: 20,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    formSubtitle: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderStyle: 'solid',
        borderColor: 'rgba(206, 90, 75, 0.8)', // Jaune pour le bouton d'importation
        backgroundColor: 'rgba(206, 90, 75, 0.05)',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: 'rgba(206, 90, 75, 0.3)',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: 'rgba(206, 90, 75, 1)',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});