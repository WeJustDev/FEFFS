import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button } from 'tamagui'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Nouvel état pour gérer le chargement

    // Fonction pour récupérer les données utilisateur
    const fetchUserData = async () => {
        try {
            const data = await AsyncStorage.getItem("user_data");
            if (data) {
                setUserData(JSON.parse(data));
            } else {
                setUserData(null);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        } finally {
            setIsLoading(false); // Fin du chargement, quelle que soit l'issue
        }
    };

    // Fonction pour supprimer les données utilisateur
    const handleDeleteUserData = async () => {
        try {
            await AsyncStorage.removeItem("user_data");
            setUserData(null); // Mise à jour de l'état local
        } catch (error) {
            console.error("Erreur lors de la suppression des données :", error);
        }
    };

    // Charger les données utilisateur au montage du composant
    useEffect(() => {
        fetchUserData();
    }, []);

    // Redirection vers Signup uniquement lorsque le chargement est terminé
    useEffect(() => {
        if (!isLoading && userData === null) {
            navigation.replace("Signup");
        }
    }, [userData, isLoading]);

    // Affichage en fonction de l'état de chargement
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Chargement...</Text>
            </View>
        );
    }

    return (
        <View className="flex justify-center items-center h-full">
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Bienvenue !</Text>
            {userData ? (
                <>
                    <Text>Nom : {userData.username}</Text>
                    <Text>Email : {userData.email}</Text>
                </>
            ) : (
                <Text style={{ marginBottom: 20 }}>Aucune donnée utilisateur.</Text>
            )}
            {/* Bouton pour supprimer les données */}
            <Button onPress={handleDeleteUserData}>Rafraîchir</Button>
        </View>
    );
}
