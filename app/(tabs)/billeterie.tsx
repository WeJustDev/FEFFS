import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Linking, Modal, Pressable, AccessibilityInfo, findNodeHandle } from 'react-native';
import AnimatedCarousel from '@/components/ui/AnimatedCarousel';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import EventModal from '@/components/EventModal';
import PurchaseModal from '@/components/PurchaseModal';
import Thankyou from '@/components/Thankyou';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useFocusEffect } from '@react-navigation/native';

export default function Billeterie() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [thankyouModalVisible, setThankyouModalVisible] = useState(false);

   const openerRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);
   const consultezRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);

   useFocusEffect(
       useCallback(() => {
         const setFocus = () => {
           setTimeout(() => {
             if (consultezRef.current) {
               const nodeHandle = findNodeHandle(consultezRef.current);
               if (nodeHandle) {
                 AccessibilityInfo.setAccessibilityFocus(nodeHandle);
               }
             }
           }, 100);
         };
         setFocus();
       }, [])
     );

    const carouselItems = [
    <View
      key="1"
      style={{
        width: '90%',
        height: 115,
        padding: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].cardBg,
        borderRadius: 30,
        alignSelf: 'center',
      }}
      accessible={true}
      accessibilityLabel="Avantage 1 : Seulement 6,50€ par séance et pour toutes les séances. Icône représentant un filtre de film."
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <Text style={{ color: Colors[colorScheme ?? 'light'].headerText, width: '50%' }}>
          Seulement 6,50€ par séance et pour toutes les séances !
        </Text>
        <MaterialIcons
          name="movie-filter"
          size={60}
          color={Colors[colorScheme ?? 'light'].dateTagText}
          accessible={true}
          accessibilityLabel="Filtre de film"
        />
      </View>
    </View>,
    <View
      key="2"
      style={{
        width: '90%',
        height: 115,
        padding: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].cardBg,
        borderRadius: 30,
        alignSelf: 'center',
      }}
      accessible={true}
      accessibilityLabel="Avantage 2 : Un accès coupe-file à toutes les séances et événements du festival. Icône représentant une personne courant."
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <Text style={{ color: Colors[colorScheme ?? 'light'].headerText, width: '50%' }}>
          Un accès coupe-file à toutes les séances et événements du festival.
        </Text>
        <FontAwesome6
          name="person-running"
          size={60}
          color={Colors[colorScheme ?? 'light'].dateTagText}
          accessible={true}
          accessibilityLabel="Personne courant"
        />
      </View>
    </View>,
    <View
      key="3"
      style={{
        width: '90%',
        height: 115,
        padding: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].cardBg,
        borderRadius: 30,
        alignSelf: 'center',
      }}
      accessible={true}
      accessibilityLabel="Avantage 3 : Des tarifs réduits à la Master Class ainsi que pour la nuit excentrique. Icône représentant des étiquettes."
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <Text style={{ color: Colors[colorScheme ?? 'light'].headerText, width: '50%' }}>
          Des tarifs réduits à la Master Class ainsi que pour la nuit excentrique.
        </Text>
        <AntDesign
          name="tags"
          size={60}
          color={Colors[colorScheme ?? 'light'].dateTagText}
          accessible={true}
          accessibilityLabel="Étiquettes"
        />
      </View>
    </View>,
  ];

  function handlePurchaseSuccess(): void {
    setPurchaseModalVisible(false);
    setThankyouModalVisible(true);
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? 'light'].pageBg,
        width: '100%'
      }}
    >
      <EventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        openerRef={openerRef}
      />
      <PurchaseModal
        visible={purchaseModalVisible}
        onClose={() => setPurchaseModalVisible(false)}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={thankyouModalVisible}
        onRequestClose={() => {
          setThankyouModalVisible(!thankyouModalVisible);
        }}
      >
        <Thankyou />
        <Pressable
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            padding: 20,
            backgroundColor: Colors[colorScheme ?? 'light'].button,
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={() => setThankyouModalVisible(!thankyouModalVisible)}
        >
          <Text style={{ color: Colors[colorScheme ?? 'light'].headerText, fontWeight: 'bold' }}>Fermer</Text>
        </Pressable>
      </Modal>

      {/* Début page */}
      <View style={{ marginTop: 64, marginBottom: 36, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('@/assets/images/logo.png')}
              accessible={true}
              accessibilityLabel="Logo de l'application FEFFS"
              accessibilityRole="image"
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.welcomeText, { color: Colors[colorScheme ?? 'light'].headerText }]}
              ref={consultezRef}
              accessible={true}
              accessibilityRole="header"
              accessibilityLabel="Bienvenue sur La Billetterie Officielle">
              Bienvenue sur
            </Text>
            <Text style={[styles.titleText, { color: Colors[colorScheme ?? 'light'].headerText }]}
              accessible={false}
              accessibilityRole="header"
              accessibilityLabel="La Billetterie Officielle"
  >
              La Billetterie Officielle
            </Text>
          </View>
        </View>
      </View>

      <View style={{ minHeight: 100 }}>
        <View style={[
          styles.passContainer,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].cardDarkBg
          }
        ]}>
          <View>
            <View style={styles.passHeader}>
              <Text style={[
                styles.passTitle,
                { color: Colors[colorScheme ?? 'light'].headerText }
              ]}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="Le Pass Festival"
          >
                Le Pass Festival
              </Text>
              <View style={[
                styles.dateTag,
                { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }
              ]}>
                <Text style={[
                  styles.dateTagText,
                  { color: Colors[colorScheme ?? 'light'].dateTagText }
                ]}
                  accessible={true}
                  accessibilityLabel="Date du pass : 20-29 Sept 2024"
            >
                  20-29 Sept 2024
                </Text>
              </View>
            </View>
            <View style={styles.carouselContainer}>
              <AnimatedCarousel items={carouselItems} />
            </View>
            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="Les cinémas partenaires"
          >
                Les cinémas partenaires
              </Text>
              <View style={styles.badgesContainer}>
                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/tCX3iZjVSoyMpn5Q6')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Ouvrir l'emplacement de Cinéma Star"
                  accessibilityHint="Appuyez pour ouvrir l'emplacement de Cinéma Star dans Maps"
            >
                  <Text style={styles.badgeText}>Cinéma Star</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/4zJfdEUzuMPpJ2NQ6')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Ouvrir l'emplacement de Le Vox"
                  accessibilityHint="Appuyez pour ouvrir l'emplacement de Le Vox dans Maps"
            >
                  <Text style={styles.badgeText}>Star St-Exupéry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/PjPh92SvUuD5KQs68')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Ouvrir l'emplacement de UGC Ciné Cité"
                  accessibilityHint="Appuyez pour ouvrir l'emplacement de UGC Ciné Cité dans Maps"
            >
                  <Text style={styles.badgeText}>Le Vox</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/56QxvvsHP1C2BzHh9')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Ouvrir l'emplacement de L'UGC Ciné Cité"
                  accessibilityHint="Appuyez pour ouvrir l'emplacement de L'UGC Ciné Cité dans Maps"
            >
                  <Text style={styles.badgeText}>UGC Ciné Cité</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/H2y9aVq9kZneFMf8A')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Ouvrir l'emplacement de Le Cosmos"
                  accessibilityHint="Appuyez pour ouvrir l'emplacement de Le Cosmos dans Maps"
            >
                  <Text style={styles.badgeText}>Le Cosmos</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 16, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}
                    accessible={true}
                    accessibilityRole="text"
                    accessibilityLabel="Note : Ne concerne pas les événements hors des salles de cinéma"
              >
                    *Ne concerne pas les événements
                  </Text>
                  <Text style={{ marginLeft: 5, fontSize: 10, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}
                    accessible={false}
                    accessibilityRole="text"
                    accessibilityLabel="Hors des salles de cinéma"
              >
                    hors des salles de cinéma
                  </Text>
                </View>
                <TouchableHighlight
                  style={{
                    boxShadow: '100px 0px 100px rgba(255, 255, 255, 0.3)',
                    backgroundColor: Colors[colorScheme ?? 'light'].button,
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 25,
                    borderColor: Colors[colorScheme ?? 'light'].dateTagBg,
                    borderWidth: 5,
                    padding: 5,
                  }}
                  onPress={() => setPurchaseModalVisible(true)}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Acheter un Pass"
                  accessibilityHint="Appuyez pour ouvrir le formulaire d'achat de pass"
                >
                  <View >
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].text,  textAlign: 'center' }}
                      accessible={true}
                      accessibilityRole="text"
                      accessibilityLabel="Acheter un Pass"
                >
                      Acheter un Pass
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}
                    accessible={true}
                  accessibilityRole="text"
                  accessibilityLabel="Prix : 13 euros"
                >
                      13€
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.events, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={() => setModalVisible(true)}
            ref={openerRef}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Voir les événements"
            accessibilityHint="Appuyez pour afficher la liste des événements"
          >
            <Text style={[
              styles.passTitle,
              { color: Colors[colorScheme ?? 'light'].headerText }
            ]}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Voir les événements"
        >
              Voir les événements
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView >
  );
}

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
  passContainer: {
    borderRadius: 40,
    flex: 1,
    minHeight: 650,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  passHeader: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTag: {
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    boxShadow: '80px 0px 200px rgba(208,78,50, 0.8)',
  },
  dateTagText: {
    fontWeight: 'bold',
  },
  carouselContainer: {
    marginBottom: 32,
  },
  events: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(52,50,51)',
    borderRadius: 40,
    padding: 24,
    minHeight: 80,
    width: '100%',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 4,
    marginBottom: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});