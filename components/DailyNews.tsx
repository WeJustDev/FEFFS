import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ProgCarousel from '@/components/ui/ProgCarousel'; 
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FilmsView from '@/components/ui/FilmsView'; 
import HighlightActivity from '@/components/HighlightActivity'; 
const { width } = Dimensions.get('window');

interface Activity {
    title: string;
    description: string;
    date: string;
    image?: any;
}

const DailyNews = () => {
    const colorScheme = useColorScheme();
    const [activeTab, setActiveTab] = useState<'horsSeances' | 'films' | null>('horsSeances');

    const itemHs: Activity[] = [
        {
            title: 'Atelier Enfants',
            description: 'Atelier créatif pour les enfants.',
            date: '14h00 - 16h00',
            image: require('@/assets/images/enfant.jpg'), // Ajoutez l'image
        },
        {
            title: 'Rencontre Artistes',
            description: 'Rencontre avec des artistes locaux.',
            date: '16h00 - 17h00',
            image: require('@/assets/images/artiste.jpg'), // Ajoutez l'image
        },
        {
            title: 'Conférence Tech',
            description: 'Discussion sur les dernières technologies.',
            date: '17h30 - 19h00',
            image: require('@/assets/images/conference.jpg'), // Ajoutez l'image
        },
    ];

    const highlightActivity: Activity = {
        title: 'Conférence Tech',
        description: 'Discussion sur les dernières technologies.',
        date: '2023-10-15',
        image: require('@/assets/images/conference.jpg'), // Ajout de l'image ici
    };

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].cardDarkBg }]}>
            <Text style={[ styles.header,{ color: Colors[colorScheme ?? 'light'].headerText },]}>
                Programme Journalier
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg },
                        activeTab === 'horsSeances' && {
                            backgroundColor: Colors[colorScheme ?? 'light'].dateTagText,
                        },
                    ]}
                    onPress={() => setActiveTab('horsSeances')}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: activeTab === 'horsSeances' ? 'white' : Colors[colorScheme ?? 'light'].dateTagText,
                            },
                        ]}
                    >
                        Hors séances
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg },
                        activeTab === 'films' && {
                            backgroundColor: Colors[colorScheme ?? 'light'].dateTagText,
                        },
                    ]}
                    onPress={() => setActiveTab('films')}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            {
                                color: activeTab === 'films' ? 'white' : Colors[colorScheme ?? 'light'].dateTagText,
                            },
                        ]}
                    >
                        Films
                    </Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'horsSeances' && (
                <View style={styles.carouselContainer}>
                    <ProgCarousel items={itemHs} />
                </View>
            )}

            {activeTab === 'films' && <FilmsView />}

            {/* Activité phare du jour */}
            <Text
                style={[
                    styles.header,
                    { color: Colors[colorScheme ?? 'light'].headerText },
                ]}
            >
                Événement phare du jour
            </Text>
            
            <HighlightActivity activity={highlightActivity} />
        </View>
    );
};

export default DailyNews;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 10,
    },
    header: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    carouselContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        width: width - 60,
        alignItems: 'center',
    },
});