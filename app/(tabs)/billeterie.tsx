import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import AnimatedCarousel from '@/components/ui/AnimatedCarousel';
import { Colors } from '@/constants/Colors';

import { useColorScheme } from '@/hooks/useColorScheme';

const carouselItems = [
  <View
    key="1"
    style={{
      width: '90%',
      height: 215,
      backgroundColor: Colors.light.cardBg,
      borderRadius: 40,
      alignSelf: 'center',
    }}
  ></View>,
  <View
    key="2"
    style={{
      width: '90%',
      height: 215,
      backgroundColor: Colors.light.cardBg,
      borderRadius: 40,
      alignSelf: 'center',
    }}
  ></View>,
];

export default function Billeterie() {
  const colorScheme = useColorScheme();

  console.log(colorScheme);

  return (
    <ScrollView 
      style={{ 
        flex: 1, 
        backgroundColor: Colors[colorScheme ?? 'light'].pageBg, 
        width: '100%' 
      }}
    >
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

      <View style={{ marginBottom: 16 }}>
        <View style={[
          styles.passContainer, 
          { backgroundColor: Colors[colorScheme ?? 'light'].cardDarkBg }
        ]}>
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

          <View style={styles.footer}>
          </View>
        </View>
      </View>
    </ScrollView>
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
    minHeight: 600,
    paddingTop: 24,
    overflow: 'hidden',
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
    height: 225,
  },
  footer: {
    marginTop: 16,
    backgroundColor: 'rgb(52,50,51)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
    height: '100%',
  },
});