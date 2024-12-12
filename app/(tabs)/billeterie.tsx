import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Linking, Modal, Pressable } from 'react-native';
import AnimatedCarousel from '@/components/ui/AnimatedCarousel';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import EventModal from '@/components/EventModal';
export default function Billeterie() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const carouselItems = [
    <View
      key="1"
      style={{
        width: '90%',
        height: 115,
        padding: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].cardBg,
        borderRadius: 30,
        alignSelf: 'center'
      }}
    >
      <Text style={{ color: Colors[colorScheme ?? 'light'].headerText }}>
        Seulement 6,50€ par séance et pour toutes les séances !
      </Text>
    </View>,
    <View
      key="2"
      style={{
        width: '90%',
        height: 115,
        padding: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].cardBg,
        borderRadius: 30,
        alignSelf: 'center'
      }}
    >
      <Text style={{ color: Colors[colorScheme ?? 'light'].headerText }}>
        Un accès coupe-file à toutes les séances et événements du festival.
      </Text>
    </View>,
    <View
      key="3"
      style={{
        width: '90%',
        height: 115,
        padding: 20,
        backgroundColor: Colors[colorScheme ?? 'light'].cardBg,
        borderRadius: 30,
        alignSelf: 'center'
      }}
    >
      <Text style={{ color: Colors[colorScheme ?? 'light'].headerText }}>
        Des tarifs réduits à la Master Class ainsi que pour la nuit excentrique.
      </Text>
    </View>,
  ];

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
          />
      <View style={{ marginTop: 64, marginBottom: 36, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('@/assets/images/logo.png')}
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.welcomeText, { color: Colors[colorScheme ?? 'light'].headerText }]}>
              Bienvenue sur
            </Text>
            <Text style={[styles.titleText, { color: Colors[colorScheme ?? 'light'].headerText }]}>
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
              ]}>
                Le Pass Festival
              </Text>
              <View style={[
                styles.dateTag,
                { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }
              ]}>
                <Text style={[
                  styles.dateTagText,
                  { color: Colors[colorScheme ?? 'light'].dateTagText }
                ]}>
                  20-29 Sept 2024
                </Text>
              </View>
            </View>
            <View style={styles.carouselContainer}>
              <AnimatedCarousel items={carouselItems} />
            </View>
            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}>
                Les cinémas partenaires
              </Text>
              <View style={styles.badgesContainer}>
                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/tCX3iZjVSoyMpn5Q6')}>
                  <Text style={styles.badgeText}>Cinéma Star</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/4zJfdEUzuMPpJ2NQ6')}>
                  <Text style={styles.badgeText}>Star St-Exupéry</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/PjPh92SvUuD5KQs68')}>
                  <Text style={styles.badgeText}>Le Vox</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/56QxvvsHP1C2BzHh9')}>
                  <Text style={styles.badgeText}>UGC Ciné Cité</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.badge}
                  onPress={() => Linking.openURL('https://maps.app.goo.gl/H2y9aVq9kZneFMf8A')}>
                  <Text style={styles.badgeText}>Le Cosmos</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 16, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}>
                    *Ne concerne pas les événements
                  </Text>
                  <Text style={{ marginLeft: 5, fontSize: 10, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}>
                    hors des salles de cinéma
                  </Text>
                </View>
                <TouchableHighlight
                  style={{
                    boxShadow: '100px 0px 100px rgba(255, 255, 255, 0.3)',
                    backgroundColor: Colors[colorScheme ?? 'light'].pageBg,
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    borderRadius: 25,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}>
                      Acheter un Pass
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors[colorScheme ?? 'light'].headerText }}>
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
          >
            <Text style={[
              styles.passTitle,
              { color: Colors[colorScheme ?? 'light'].headerText }
            ]}>
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