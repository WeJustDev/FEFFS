import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Button, View, Text } from 'react-native';
import { Image } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Données des boutons de tri
const buttons = [
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

// Données des événements 
// const events = [
//   {
//     id: "1",
//     title: "Les 3 petits cochons",
//     description: "Les 3 petits cochons est un conte traditionnel européen qui figure parmi les contes les plus célèbres. Il est classé dans l'index Aarne-Thompson dans la catégorie 124.",
//     filename: "3-petits-cochons.jpg",
//     duration: "90",
//     showtimes: [
//       { id: "7", time: new Date('2024-09-15T14:00:00'), localisation: 'Cinéma 1' },
//       { id: "8", time: new Date('2024-09-16T16:00:00'), localisation: 'Cinéma 2' }
//     ],
//     category: "1"
//   },
//   {
//     id: "2",
//     title: "Le Petit Prince",
//     description: "Le Petit Prince est un conte poétique et philosophique écrit par Antoine de Saint-Exupéry.",
//     filename: "le-petit-prince.jpg",
//     duration: "120",
//     showtimes: [],
//     category: "2"
//   },
//   {
//     id: "3",
//     title: "Cendrillon",
//     description: "Cendrillon est un conte populaire dont il existe de nombreuses versions à travers le monde.",
//     filename: "cendrillon.jpg",
//     duration: "95",
//     showtimes: [
//       { id: "5", time: new Date('2024-09-15T14:00:00'), localisation: 'Cinéma 1' },
//       { id: "6", time: new Date('2024-09-16T16:00:00'), localisation: 'Cinéma 2' }
//     ],
//     category: "3"
//   },
//   {
//     id: "4",
//     title: "Blanche-Neige",
//     description: "Blanche-Neige est un conte de fées allemand rendu célèbre par les frères Grimm.",
//     filename: "blanche-neige.jpg",
//     duration: "85",
//     showtimes: [],
//     category: "1"
//   },
//   {
//     id: "5",
//     title: "Le Chat Botté",
//     description: "Le Chat Botté est un conte populaire européen, notamment rendu célèbre par Charles Perrault.",
//     filename: "le-chat-botte.jpg",
//     duration: "100",
//     showtimes: [
//       { id: "3", time: new Date('2024-11-02T11:30:00'), localisation: 'Cinéma 1' },
//       { id: "4", time: new Date('2024-09-16T16:00:00'), localisation: 'Cinéma 2' }
//     ],
//     category: "2"
//   },
//   {
//     id: "6",
//     title: "La Belle au bois dormant",
//     description: "La Belle au bois dormant est un conte de fées classique qui a été popularisé par Charles Perrault.",
//     filename: "la-belle-au-bois-dormant.jpg",
//     duration: "110",
//     showtimes: [
//       { id: "1", time: new Date('2024-09-15T14:00:00'), localisation: 'Cinéma 1' },
//       { id: "2", time: new Date('2024-09-16T16:00:00'), localisation: 'Cinéma 2' }
//     ],
//     category: "3"
//   },
//   {
//     id: "7",
//     title: "Hansel et Gretel",
//     description: "Hansel et Gretel est un conte de fées allemand recueilli par les frères Grimm.",
//     filename: "hansel-et-gretel.jpg",
//     duration: "90",
//     showtimes: [],
//     category: "1"
//   }
// ];



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

  useEffect(() => {
    fetch('https://feffs.elioooooo.fr/event/get')
      .then(response => response.json())
      .then(data => setEvents(data))
      .then(() => console.log(events))   
      .then(() => console.log(events[0] ? events[0].title : 'No data'));
  }, []);

  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(events); // Initialement, on affiche tous les événements
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
  const renderButton = ({ item }: { item: typeof buttons[0] }) => (
    <Button
      title={item.title}
      onPress={() => setSelectedButtonId(item.id)}
      color={selectedButtonId === item.id ? '#007BFF' : '#808080'} // Coloration du bouton actif
    />
  );

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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Programmation</ThemedText>
      </ThemedView>
      <ThemedText>FEFFS 2024</ThemedText>

      <View style={styles.container}>

        <FlatList
          data={buttons}
          keyExtractor={(item) => item.id}
          renderItem={renderButton}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonContainer}
        />
        

        
        {filteredEvents.length > 0 ? (
          console.log('filtered : ' + filteredEvents),
          filteredEvents.map(event => (
            <View key={event._id} style={styles.eventCard}>
              <Collapsible title={event.title}>
                <Image
                  source={{ uri: `path/to/images/${event.filename}` }}
                  style={{ width: '100%', height: 200, marginBottom: 10, borderColor: '#f0f0f0', borderWidth: 1 }}
                />
                <View style={styles.eventCard}>
                  <Text>Description</Text>
                  <Text>{event.description}</Text>
                </View>

                <Text style={styles.eventCard}>Durée : {event.duration} minutes</Text>
                <View style={styles.eventCard}>
                  <Text>Séances</Text>
                  {event.showtimes.length > 0 ? event.showtimes.map(showtime => (
                    <Text key={showtime.id} >{formatDate(showtime.time)} - {showtime.localisation}</Text>
                  ))
                  : <Text >Pas de séance prévue</Text>
                  }
                </View>
              </Collapsible>
              <Button
                title="Ajouter à mon agenda"
                onPress={() => { }}
                // Coloration du bouton actif
              />
            </View>
          ))
        ) : (
          <Text style={styles.noEventsText}>Aucun événement ne correspond à votre profil.</Text>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  eventCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    color: '#333',
  },
  noEventsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
