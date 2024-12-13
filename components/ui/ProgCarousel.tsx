import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

interface Activity {
  title: string;
  description: string;
  date: string;
  image: any; // Ajoutez une propriété image
}

interface ProgCarouselProps {
  items: Activity[];
}

const ProgCarousel: React.FC<ProgCarouselProps> = ({ items }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const onScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {items.map((item, index) => (
          <View key={index} style={[styles.card, { shadowColor: colors.text }]}>
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>
              <Text style={styles.cardDescription}>
                {item.description}
              </Text>
              <Text style={[styles.cardDate, { color: colors.dateTagText }]}>
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              { backgroundColor: colors.tabIconDefault },
              index === currentIndex
                ? { backgroundColor: colors.tabIconSelected }
                : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProgCarousel;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: 16,
  },
  scrollView: {
    width: width - 32,
  },
  card: {
    width: width - 48,
    borderRadius: 10,
    marginHorizontal: 8,
    overflow: 'hidden',
    position: 'relative', // Permet d'utiliser l'absolu dans l'overlay
  },
  cardImage: {
    width: '100%',
    height: 170, // Définit la hauteur de l'image
  },
  overlay: {
    position: 'absolute', // Place le texte par-dessus l'image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end', // Positionne le texte en bas de la carte
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Ajoute une superposition sombre
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  cardDate: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 3,
    marginHorizontal: 4,
  },
});
