import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const FilmsView = () => {
    const colorScheme = useColorScheme();
    const films = [
        { title: 'Fracture', image: require('@/assets/images/FEFFS1.jpg') },
        { title: 'Ombre noir', image: require('@/assets/images/FEFFS2.jpg') },
        { title: 'La Spirale', image: require('@/assets/images/FEFFS3.png') },
        { title: 'MechaTech', image: require('@/assets/images/FEFFS4.jpg') },
    ];

    return (
        <View style={styles.filmsContainer}>
            {films.map((film, index) => (
                <ImageBackground
                    key={index}
                    source={film.image}
                    style={styles.filmBox}
                    imageStyle={{ borderRadius: 10, transform: [{ scale: 1.1 }] }}
                    accessible={true}
                    accessibilityLabel={`Affiche du film : ${film.title}`}
                    accessibilityRole="image"
                >
                    <View style={styles.overlay}>
                        <Text
                            style={[
                                styles.filmsText,
                                { color: Colors[colorScheme ?? 'light'].headerText },
                            ]}
                            accessible={true}
                            accessibilityRole="header"
                            accessibilityLabel={`Titre du film : ${film.title}`}
                        >
                            {film.title}
                        </Text>
                    </View>
                </ImageBackground>
            ))}
        </View>
    );
};

export default FilmsView;

const styles = StyleSheet.create({
    filmsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filmBox: {
        width: 165,
        height: 80,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filmsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});