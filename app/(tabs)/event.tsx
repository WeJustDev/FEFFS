import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Button, View, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'react-native';
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';


// Données des boutons de tri
const buttons = [
  {
    id: "",
    title: "Tout voir",
  },
  {
    id: "1",
    title: "Palmarès",
  },
  {
    id: "2",
    title: "Longs-métrages",
  },
  {
    id: "3",
    title: "Rétrospectives",
  },
];


type Event = {
  _id: string;
  title: string;
  description: string;
  filename: string;
  duration: string;
  showtimes: { id: string; time: Date; localisation: string }[];
  category: string;
};

export default function TabTwoScreen() {
  const [events, setEvents] = useState<Event[]>([]);

  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(events);

  // État de gestion des programmes
  const [userProgramId, setUserProgramId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);

  const colorScheme = useColorScheme();


  useEffect(() => {
    fetch('https://feffs.elioooooo.fr/event/get')
      .then(response => response.json())
      .then(data => setEvents(data))
      .then(() => console.log(events))   
      .then(() => console.log(events[0] ? events[0].title : 'No data'));
  }, []);


  useEffect(() => {
    if (!selectedButtonId) {
      setFilteredEvents(events);
    } else {
      const filteredData = events.filter(event => event.category === selectedButtonId);
      setFilteredEvents(filteredData);
    }
  }, [selectedButtonId, events]);

  // Fonction de tri qui se déclenche à chaque fois que le bouton sélectionné change
  useEffect(() => {
    filterEvents();
  }, [selectedButtonId, events]);

  // Filtrer les événements en fonction de l'utilisateur sélectionné
  const filterEvents = () => {
    if (!selectedButtonId) {
      setFilteredEvents(events); // Affiche tous les événements si aucun bouton n'est sélectionné
      return;
    }

    const selectedButton = buttons.find(button => button.id === selectedButtonId);
    if (!selectedButton) return;

    const filteredData = events.filter(event => event.category === selectedButtonId);

    setFilteredEvents(filteredData);
  };

  // Fonction de rendu des boutons de tri
  const renderButton = ({ item }: { item: typeof buttons[0] }) => {
    const isSelected = selectedButtonId === item.id;

    return (
      <Pressable
        onPress={() => setSelectedButtonId(item.id)}
        style={[
          styles.filterButton,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg,
            borderColor: isSelected ? Colors[colorScheme ?? 'light'].dateTagText : 'transparent',
          }
        ]}
      >
        <Text style={[
          styles.filterButtonText,
          { color: Colors[colorScheme ?? 'light'].dateTagText }
        ]}>
          {item.title}
        </Text>
      </Pressable>
    );
  };

  // Fonction pour formater la date
  const formatDate = (date: Date): string => {
    const daysOfWeek = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];

    const dayOfWeek = daysOfWeek[date.getDay()]; // Obtenir le jour de la semaine (0 = Dimanche)
    const day = String(date.getDate()).padStart(2, '0'); // Obtenir le jour du mois (16) avec zéro devant
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtenir le mois (Septembre = 8 + 1)
    const hours = String(date.getHours()).padStart(2, '0'); // Heures au format 24h
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes

    return `${dayOfWeek} ${day}.${month} ${hours}h${minutes}`;
  };


  const handleAdd = async (eventId: string) => {
    try {
      const userEmail = await AsyncStorage.getItem("email");
      if (!userEmail) throw new Error("Vous devez être connecté pour ajouter un évènement à votre programme");

      const userIdResponse = await fetch('https://feffs.elioooooo.fr/user/get/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });

      const { userId } = await userIdResponse.json();

      const userProgramResponse = await fetch('https://feffs.elioooooo.fr/program/get/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      let programId = null;
      if (userProgramResponse.status === 200) {
        const programData = await userProgramResponse.json();
        programId = programData._id;
      } else {
        const newProgramResponse = await fetch('https://feffs.elioooooo.fr/program/add/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
        const newProgramData = await newProgramResponse.json();
        programId = newProgramData._id;
      }

      const addEventResponse = await fetch(`https://feffs.elioooooo.fr/program/add-event/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventId })
      });

      if (addEventResponse.status === 200) {
        setError("Évènement ajouté au programme avec succès");
      } else {
        throw new Error("Erreur lors de l'ajout de l'évènement au programme");
      }
    } catch (error: any) {
      setError(error.message);
    }
    setHasError(true);
    setNotification(true); // Activer la notification ici
  };


  return (
    <>
      {notification && (
        <View style={{ width: "100%", padding: 10, position: "absolute" }}>
          <View
            style={[
              styles.notification,
              {
                zIndex: 20,
                backgroundColor: Colors[colorScheme ?? "light"].background,
              },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
                gap: 20,
                flex: 1,
              }}
            >
              <View style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                {error && error.startsWith("Erreur") ? (
                  <Text
                    style={[
                      styles.message,
                      { color: Colors[colorScheme ?? "light"].texterror, flex: 1 },
                    ]}
                  >
                    Erreur...
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.message,
                      { color: Colors[colorScheme ?? "light"].textsuccess, flex: 1 },
                    ]}
                  >
                    Succès !
                  </Text>
                )}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 5,
                    flex: 1,
                  }}
                >
                  {error && error.startsWith("Erreur") ? (
                    <IconSymbol
                      name="error.fill"
                      size={16}
                      color={Colors[colorScheme ?? "light"].texterror}
                    />
                  ) : (
                    <IconSymbol
                      name="checkmark"
                      size={16}
                      color={Colors[colorScheme ?? "light"].textsuccess}
                    />
                  )}
                  <Text
                    style={[
                      styles.message,
                      { color: Colors[colorScheme ?? "light"].text, flex: 1, textAlign: "left" },
                    ]}
                  >
                    {error}
                  </Text>
                </View>
              </View>
              <Pressable onPress={() => setNotification(false)}>
                <Text
                  style={[
                    styles.message,
                    { color: Colors[colorScheme ?? "light"].text },
                  ]}
                >
                  ✖
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <View style={{ marginTop: 64, marginBottom: 36, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("@/assets/images/logo.png")}
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={[
                styles.welcomeText,
                { color: Colors[colorScheme ?? "light"].headerText },
              ]}
            >
              Consultez
            </Text>
            <Text
              style={[
                styles.titleText,
                { color: Colors[colorScheme ?? "light"].headerText },
              ]}
            >
              Votre programme
            </Text>
          </View>
        </View>
      </View>

      {/* boutton pour filtrer */}
      <View style={{ height: 80, marginBottom: 20 }}>
        <FlatList
          data={buttons}
          keyExtractor={(item) => item.id}
          renderItem={renderButton}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[{ alignItems: 'center' }, ]} 
        />
      </View>

      {/* Le contenu principal de la page */}
      <View style={{ flex: 1, marginLeft: 10, marginRight:10 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <View key={event._id} >
                <Image
                  source={require('@/assets/images/bandeau-1.png')}
                  style={{ width: '100%', height: 200, marginBottom: 10, borderColor: 'transparent' }}
                />
                <View style={styles.eventInfos}>
                    <Collapsible title={event.title}>
                    <View>
                      <Text style={[{ fontWeight: 'bold' }, { color: Colors[colorScheme ?? 'light'].text }]}>Description</Text>
                      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{event.description}</Text>
                    </View>
                    <View>
                      <Text style={[{ fontWeight: 'bold' }, { color: Colors[colorScheme ?? 'light'].text }]}>Durée : </Text>
                      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>{event.duration} minutes</Text>
                    </View>
                    <View>
                      <Text style={[{ fontWeight: 'bold' }, { color: Colors[colorScheme ?? 'light'].text }]}>Séances</Text>
                      {event.showtimes.length > 0 ? event.showtimes.map(showtime => (
                        <Text key={showtime.id} style={{ color: Colors[colorScheme ?? 'light'].text }}>{formatDate(showtime.time)} - {showtime.localisation}</Text>
                      )) : <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>Pas de séance prévue</Text>}
                    </View>
                  </Collapsible>
                </View>
                <Pressable onPress={() => handleAdd(event._id)} style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].dateTagBg }]}>
                  <Text style={[styles.buyButtonText, { color: Colors[colorScheme ?? 'light'].dateTagText }]}>
                    Ajouter au planning
                  </Text>
                </Pressable>
              </View>
            ))
          ) : (
            <Text>Aucun événement ne correspond à votre profil.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
    boxShadow: "0px 0px 80px rgba(255, 255, 255, 1)",
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
  },
  notification: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 10,
    width: "95%",
    borderRadius: 5,
    left: 0,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    zIndex: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  addButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 10,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventInfos: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d35446",
    marginTop: 0,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

