import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, ScrollView, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Picker } from '@react-native-picker/picker';
import { ImgPicker } from './ImagePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Pass = {
  number?: number;
  email: string;
  birthdate: string;
  image: string;
  lastname: string;
  firstname: string;
  _id?: string;
  __v?: number;
};

type PurchaseModalProps = {
  visible: boolean;
  onClose: () => void;
  onPassGenerated?: (pass: any) => void;
  onPurchaseSuccess?: () => void;
};

const PurchaseModal: React.FC<PurchaseModalProps> = ({ visible, onClose, onPassGenerated, onPurchaseSuccess }) => {
  const colorScheme = useColorScheme();
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const isFormComplete = prenom && nom && email && day && month && year && imageSelected;

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setImageSelected(false);
    setDay('');
    setMonth('');
    setYear('');
    setEmail('');
    setNom('');
    setPrenom('');
    setBase64Image(null);
  };

    const handleSubmit = async () => {
    if (!isFormComplete) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
  
    try {
      const dateNaissance = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  
      console.log('Formatted birthdate:', dateNaissance);
  
      const requestBody = {
        lastname: nom,
        firstname: prenom,
        email: email,
        birthdate: dateNaissance,
        image: base64Image,
      };
  
      console.log('Request body:', requestBody);
  
      // Appel à la base de données commentés pour éviter les erreurs
      // const response = await fetch("https://feffs.elioooooo.fr/pass/add", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(requestBody),
      // });
  
      // console.log('Response status:', response.status);
      // console.log('Response headers:', response.headers);
  
      // if (!response.ok) {
      //   const errorText = await response.text();
      //   console.error('Server response:', errorText);
      //   throw new Error(`Erreur lors de la création du pass: ${errorText}`);
      // }
  
      // const passData = await response.json();
      // console.log('Pass data received:', passData);
  
      const passData = requestBody;
  
      await AsyncStorage.setItem("pass", JSON.stringify(passData));
      await AsyncStorage.setItem("name", nom);
      await AsyncStorage.setItem("firstname", prenom);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("birthdate", dateNaissance);
      await AsyncStorage.setItem("image", base64Image || '');
  
      if (onPassGenerated) {
        onPassGenerated(passData);
      }
      if (onPurchaseSuccess) {
        onPurchaseSuccess();
      }
  
      resetForm();
      onClose();
  
    } catch (error) {
      console.error("Erreur de génération du pass:", error);
      Alert.alert('Erreur', 'Impossible de générer le pass. Veuillez réessayer.');
    }
  };

  return (
    <Modal
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      accessible={true}
      accessibilityLabel="Modal d'achat de Pass Festival"

    >
      <View style={[styles.modalContainer, { backgroundColor: Colors[colorScheme ?? 'light'].pageBg }]}>
        <View style={{ marginTop: 16, marginBottom: 12, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                accessible={true}
                accessibilityLabel="Logo de l'application FEFFS"
                accessibilityRole="image"
              />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={[styles.welcomeText, { color: Colors[colorScheme ?? 'light'].headerText }]}
                accessible={false}
                accessibilityRole="header"
                accessibilityLabel="Festival Européen du Film Fantastique"
              >
                Festival Européen du Film Fantastique
              </Text>
              <Text style={[styles.titleText, { color: Colors[colorScheme ?? 'light'].headerText }]}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="Acheter un Pass"
              >
                Acheter un Pass
              </Text>
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

          <ImgPicker onImageSelected={(base64) => {
            setImageSelected(!!base64);
            setBase64Image(base64);
          }}
           />

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Prénom :
            </Text>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].headerText }]}
              value={prenom}
              onChangeText={setPrenom}
              placeholder="Entrez votre prénom"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
              accessible={true}
              accessibilityLabel="Champ pour le prénom"
              accessibilityHint="Entrez votre prénom ici"
              // autoFocus={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Nom :
            </Text>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].headerText }]}
              value={nom}
              onChangeText={setNom}
              placeholder="Entrez votre nom"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
              accessible={true}
              accessibilityLabel="Champ pour le nom"
              accessibilityHint="Entrez votre nom ici"

            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Email :
            </Text>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].headerText }]}
              value={email}
              onChangeText={setEmail}
              inputMode='email'
              placeholder="Entrez votre email"
              placeholderTextColor={Colors[colorScheme ?? 'light'].placeholderText}
              keyboardType="email-address"
              autoCapitalize="none"
              accessible={true}
              accessibilityLabel="Champ pour l'email"
              accessibilityHint="Entrez votre adresse email ici"

            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Date de naissance :
            </Text>
            <View style={styles.datePickerContainer}>
              <Picker
                selectedValue={day}
                onValueChange={(value: string) => setDay(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                accessible={true}
                accessibilityLabel="Sélecteur de jour"
                accessibilityHint="Choisissez votre jour de naissance"
              >
                <Picker.Item label="Jour" value="" />
                {[...Array(31)].map((_, i: number) => (
                  <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                ))}
              </Picker>

              <Picker
                selectedValue={month}
                onValueChange={(value: string) => setMonth(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                accessible={true}
                accessibilityLabel="Sélecteur de mois"
                accessibilityHint="Choisissez votre mois de naissance"
              >
                <Picker.Item label="Mois" value="" />
                {[...Array(12)].map((_, i) => (
                  <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
                ))}
              </Picker>

              <Picker
                selectedValue={year}
                onValueChange={(value: string) => setYear(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown"
                accessible={true}
                accessibilityLabel="Sélecteur d'année"
                accessibilityHint="Choisissez votre année de naissance"
              >
                <Picker.Item label="Année" value="" />
                {Array.from({ length: 100 }, (_, i: number) => {
                  const yr: number = new Date().getFullYear() - i;
                  return <Picker.Item key={yr} label={`${yr}`} value={`${yr}`} />;
                })}
              </Picker>
            </View>
          </View>

                    <View
                      style={styles.passDetailsContainer}
                      accessibilityRole='summary'
                      accessibilityLabel="Détails du Pass Festival"
                    >
                      <Text
                        style={[styles.passDetailsTitle, { color: Colors[colorScheme ?? 'light'].headerText }]}
                        accessible={true}
                        accessibilityLabel="Détails du Pass Festival"
                      >
                        Détails du Pass Festival
                      </Text>
                    
                      <View
                        style={styles.passDetailRow}
                        accessible={true}
                        accessibilityLabel="Prix du Pass, 13 euros"
                      >
                        <Text
                          style={[styles.passDetailLabel, { color: Colors[colorScheme ?? 'light'].headerText }]}
                          accessible={true}
                          accessibilityLabel="Prix du Pass"
                        >
                          Prix du Pass
                        </Text>
                        <Text
                          style={[styles.passDetailValue, { color: Colors[colorScheme ?? 'light'].headerText }]}
                          accessible={true}
                          accessibilityLabel="13 euros"
                        >
                          13€
                        </Text>
                      </View>
                    
                      <View
                        style={styles.passDetailRow}
                        accessible={true}
                        accessibilityLabel="Validité, 20-29 Sept 2024"
                      >
                        <Text
                          style={[styles.passDetailLabel, { color: Colors[colorScheme ?? 'light'].headerText }]}
                          accessible={true}
                          accessibilityLabel="Validité"
                        >
                          Validité
                        </Text>
                        <Text
                          style={[styles.passDetailValue, { color: Colors[colorScheme ?? 'light'].headerText }]}
                          accessible={true}
                          accessibilityLabel="20-29 Sept 2024"
                        >
                          20-29 Sept 2024
                        </Text>
                      </View>
                    
                      <View
                        style={styles.passDetailRow}
                        accessible={true}
                        accessibilityLabel="Cinémas Partenaires, 5 Cinémas"
                      >
                        <Text
                          style={[styles.passDetailLabel, { color: Colors[colorScheme ?? 'light'].headerText }]}
                          accessible={true}
                          accessibilityLabel="Cinémas Partenaires"
                        >
                          Cinémas Partenaires
                        </Text>
                        <Text
                          style={[styles.passDetailValue, { color: Colors[colorScheme ?? 'light'].headerText }]}
                          accessible={true}
                          accessibilityLabel="5 Cinémas"
                        >
                          5 Cinémas
                        </Text>
                      </View>
                    </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: "100%", gap: 10 }]}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
              onPress={handleClose}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Bouton Annuler"
              accessibilityHint="Appuyez pour annuler l'achat et fermer le formulaire"
            >
              <Text style={{ color: Colors[colorScheme ?? 'light'].headerText }}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isFormComplete}
              style={[
                styles.paymentButton,
                {
                  backgroundColor: isFormComplete
                    ? Colors[colorScheme ?? 'light'].button
                    : Colors[colorScheme ?? 'light'].cardDarkBg,
                },
              ]}
              onPress={handleSubmit}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Bouton Passer au paiement"
              accessibilityHint={isFormComplete ? "Appuyez pour procéder au paiement" : "Remplissez tous les champs requis pour activer le bouton"}
            >
              <Text style={{
                color: isFormComplete
                  ? Colors[colorScheme ?? 'light'].headerText
                  : 'gray'
              }}>
                Passer au paiement
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.legalSection}>
            <Text style={[styles.legalText, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Vos informations personnelles seront utilisées uniquement dans le cadre de l'achat de votre pass et ne seront pas partagées avec des tiers sans votre consentement explicite.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: Colors.light.pageBg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
    boxShadow: '0px 0px 80px rgba(255, 255, 255, 1)',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  picker: {
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.1)',
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  pickerItem: {
    fontSize: 16,
    height: 44,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  inputContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 0,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passDetailsContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  passDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  passDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  passDetailLabel: {
    fontSize: 16,
  },
  passDetailValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  paymentButton: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  legalSection: {
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  legalText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PurchaseModal;