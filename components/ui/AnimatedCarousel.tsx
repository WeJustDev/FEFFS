import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface AnimatedCarouselProps {
  items: JSX.Element[];
}

const AnimatedCarousel: React.FC<AnimatedCarouselProps> = ({ items }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  let scrollValue = 0;
  let scrolled = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      scrolled++;
      if (scrolled >= items.length) {
        scrolled = 0;
      }
      scrollValue = scrolled * width;
      scrollViewRef.current?.scrollTo({ x: scrollValue, animated: true });
      setCurrentIndex(scrolled);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  const onScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        accessible={true}
        // accessibilityRole="adjustable"
        accessibilityLabel={`Carrousel, élément ${currentIndex + 1} sur ${items.length}`}
        accessibilityHint="Glissez vers la gauche ou la droite pour naviguer à travers les éléments"
      >
        {items.map((item, index) => (
          <View key={index} style={{ width }} accessible={false}>
            {React.cloneElement(item, {
              accessible: true,
              accessibilityLabel: `Slide ${index + 1} sur ${items.length}: ${item.props.accessibilityLabel}`,
            })}
          </View>
        ))}
      </ScrollView>
      <View
        style={styles.indicatorContainer}
        accessible={true}
        accessibilityRole="none"
        accessibilityLabel={`Page ${currentIndex + 1} sur ${items.length}`}
      >
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex ? styles.activeIndicator : null,
            ]}
            accessible={true}
            accessibilityRole="none"
            accessibilityLabel={`Indicateur ${index + 1} ${index === currentIndex ? 'actif' : ''}`}
            accessibilityState={{ selected: index === currentIndex }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 4,
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
});

export default AnimatedCarousel;