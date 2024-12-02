import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import des écrans
import HomeScreen from "./HomeScreen";
import SignupScreen from "./SignupScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const [initialRoute, setInitialRoute] = useState(null);

    // Vérifie si les données utilisateur existent
    useEffect(() => {
        const checkUserData = async () => {
            const userData = await AsyncStorage.getItem("user_data");
            setInitialRoute(userData ? "Home" : "Signup");
        };

        checkUserData();
    }, []); 

    // Évite le rendu jusqu'à ce que la route initiale soit déterminée
    if (initialRoute === null) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
