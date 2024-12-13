import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ImgPicker } from './ImagePicker';

type PurchaseModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PurchaseModal: React.FC<PurchaseModalProps> = ({ visible, onClose }) => {
  const colorScheme = useColorScheme();
  const [imageSelected, setImageSelected] = useState<boolean>(false); // Track if an image is selected
  const handleClose = () => {
    setImageSelected(false);
    onClose();
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
          <View>
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].headerText }]}>
            </Text>
            <View style={styles.infoContainer}>
              <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Nom :
              </Text>
              <Text style={[styles.info, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Exemple Nom
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                Email :
              </Text>
              <Text style={[styles.info, { color: Colors[colorScheme ?? 'light'].headerText }]}>
                exemple.email@example.com
              </Text>
            </View>
            <ImgPicker onImageSelected={(uri) => setImageSelected(!!uri)} />
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
          <View style={[{ flexDirection: 'row', justifyContent: 'flex-end', alignItems:'flex-end', width: "100%", gap: 10 }]}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
              onPress={handleClose}
            >
              <Text style={{ color: Colors[colorScheme ?? 'light'].headerText }}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!imageSelected} // Disable if no image is selected
              style={[
                styles.paymentButton,
                { 
                  backgroundColor: imageSelected
                    ? Colors[colorScheme ?? 'light'].button
                    : Colors[colorScheme ?? 'light'].cardDarkBg,
                },
              ]}
              onPress={() => {
                if (imageSelected) {
                  console.log('Proceeding to payment...');
                  onClose();
                }
              }}
            >
              <Text style={{ color: imageSelected
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
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
    boxShadow: '0px 0px 80px rgba(255, 255, 255, 1)',
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
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  info: {
    fontSize: 14,
  },
  passDetailsContainer: {
    minWidth: '100%',
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  passDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  passDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  passDetailLabel: {
    fontSize: 16,
  },
  passDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  legalSection: {
    marginTop: 20,
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#555',
  },
  legalText: {
    fontSize: 12,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  disableButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  paymentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default PurchaseModal;
