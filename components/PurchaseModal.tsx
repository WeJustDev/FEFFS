import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Picker } from '@react-native-picker/picker';
import { ImgPicker } from './ImagePicker';

type PurchaseModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PurchaseModal: React.FC<PurchaseModalProps> = ({ visible, onClose }) => {
  const colorScheme = useColorScheme();
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

  // Ajoutez les états pour le jour, le mois et l'année
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Mettez à jour isFormComplete
  const isFormComplete = prenom && nom && email && day && month && year && imageSelected;

  const handleClose = () => {
    setImageSelected(false);
    setDay('');
    setMonth('');
    setYear('');
    setEmail('');
    setNom('');
    setPrenom('');
    onClose();
  };

  const handleSubmit = () => {
    const dateNaissance = `${day}/${month}/${year}`;
    console.log('Proceeding to payment...');
    console.log('Prenom:', prenom);
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Date de naissance:', dateNaissance);
    console.log('Image selected:', imageSelected);
    // Réinitialisez les champs si nécessaire
    handleClose();
  };

  return (
    <Modal
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: Colors[colorScheme ?? 'light'].pageBg }]}>
        <View style={{ marginTop: 16, marginBottom: 12, paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('@/assets/images/logo.png')}
              />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={[styles.welcomeText, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Festival Européen du Film Fantastique
              </Text>
              <Text style={[styles.titleText, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Acheter un Pass
              </Text>
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

          <ImgPicker onImageSelected={(uri) => setImageSelected(!!uri)} />

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
            />
          </View>

          <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
        Date de naissance :
      </Text>
      <View style={styles.datePickerContainer}>
        {/* Picker pour le jour */}
        <Picker
          selectedValue={day}
          onValueChange={(value: string) => setDay(value)}
          style={styles.picker}
          itemStyle={styles.pickerItem} // Ajoutez ceci
          mode="dropdown" // Optionnel : pour un style cohérent
        >
          <Picker.Item label="Jour" value="" />
          {[...Array(31)].map((_, i: number) => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>

        {/* Picker pour le mois */}
        <Picker
          selectedValue={month}
          onValueChange={(value: string) => setMonth(value)}
          style={styles.picker}
          itemStyle={styles.pickerItem} // Ajoutez ceci
          mode="dropdown" // Optionnel
        >
          <Picker.Item label="Mois" value="" />
          {[...Array(12)].map((_, i) => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>

        {/* Picker pour l'année */}
        <Picker
          selectedValue={year}
          onValueChange={(value: string) => setYear(value)}
          style={styles.picker}
          itemStyle={styles.pickerItem} // Ajoutez ceci
          mode="dropdown" // Optionnel
        >
          <Picker.Item label="Année" value="" />
          {Array.from({ length: 100 }, (_, i: number) => {
            const yr: number = new Date().getFullYear() - i;
            return <Picker.Item key={yr} label={`${yr}`} value={`${yr}`} />;
          })}
        </Picker>
      </View>
    </View>

          <View style={styles.passDetailsContainer}>
            <Text style={[styles.passDetailsTitle, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Détails du Pass Festival
            </Text>

            <View style={styles.passDetailRow}>
              <Text style={[styles.passDetailLabel, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Prix du Pass
              </Text>
              <Text style={[styles.passDetailValue, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                13€
              </Text>
            </View>

            <View style={styles.passDetailRow}>
              <Text style={[styles.passDetailLabel, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Validité
              </Text>
              <Text style={[styles.passDetailValue, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                20-29 Sept 2024
              </Text>
            </View>

            <View style={styles.passDetailRow}>
              <Text style={[styles.passDetailLabel, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Cinémas Partenaires
              </Text>
              <Text style={[styles.passDetailValue, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                5 Cinémas
              </Text>
            </View>
          </View>
          <View style={[{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', width: "100%", gap: 10 }]}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
              onPress={handleClose}
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
              onPress={() => {
                if (isFormComplete) {
                  handleSubmit();
                }
              }}
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
    paddingTop: 40,
    paddingHorizontal: 25,
    backgroundColor: Colors.light.pageBg, // Ensure consistent background
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
    height: 44, // Hauteur de chaque item
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
