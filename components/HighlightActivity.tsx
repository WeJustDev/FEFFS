import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface HighlightActivityProps {
    activity: {
        title: string;
        description: string;
        date: string;
        image?: any; // Ajoutez la propriété pour l'image
    };
}

const HighlightActivity: React.FC<HighlightActivityProps> = ({ activity }) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            {/* Image d'arrière-plan */}
            <Image
                source={activity.image}
                style={styles.image}
                resizeMode="cover"
                accessible={true}
                accessibilityLabel={`Image de l'activité : ${activity.title}`}
            />
            {/* Overlay et texte */}
            <View style={[styles.overlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} accessible={true}
                accessibilityRole="summary">
                <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].headerText }]} accessible={true}
                    accessibilityRole="header" accessibilityLabel={`Titre de l'activité ${activity.title}`}>
                    {activity.title}
                </Text>
                <Text style={[styles.description, { color: Colors[colorScheme ?? 'light'].text }]} accessible={true}
                    accessibilityLabel={`Description de l'activité : ${activity.description}`}>
                    {activity.description}
                </Text>
                <Text style={[styles.date, { color: Colors[colorScheme ?? 'light'].dateTagText }]} accessible={true}
                    accessibilityLabel={`Date de l'activité : ${activity.date}`}>
                    {activity.date}
                </Text>
            </View>
        </View>
    );
};

export default HighlightActivity;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 60,
        height: 250,
        marginHorizontal: 20,
        borderRadius: 10,
        overflow: 'hidden', // Assure que l'image et l'overlay restent dans les bords arrondis
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute', // Place l'image derrière tout
    },
    overlay: {
        flex: 1,
        justifyContent: 'center', // Centre verticalement le texte
        alignItems: 'center', // Centre horizontalement le texte
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
