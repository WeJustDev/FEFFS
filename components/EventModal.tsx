import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
}

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ visible, onClose }) => {
  const colorScheme = useColorScheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://feffs.elioooooo.fr/showtime/get/");
        const data = await response.json();

        // Assurez-vous que `data` est un tableau d'événements
        setEvents(data);
        console.log(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchEvents();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.modalContent,
          { backgroundColor: Colors[colorScheme ?? 'light'].tint },
        ]}
      >
        <Text
          style={[
            styles.modalTitle,
            { color: Colors[colorScheme ?? 'light'].headerText },
          ]}
        >
          Événements du Festival
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].headerText} />
        ) : events.length > 0 ? (
          <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Text
                  style={[
                    styles.eventTitle,
                    { color: Colors[colorScheme ?? 'light'].headerText },
                  ]}
                >
                  {event.title}
                </Text>
                <Text
                  style={[
                    styles.eventDetails,
                    { color: Colors[colorScheme ?? 'light'].text },
                  ]}
                >
                  {event.date}{'\n'}
                  {event.location}{'\n'}
                  Tarif: 15€
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text
            style={[
              styles.noEventsText,
              { color: Colors[colorScheme ?? 'light'].text },
            ]}
          >
            Aucun événement disponible.
          </Text>
        )}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '8%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    position: 'absolute',
    top: '10%',
    left: '0%',
    right: '0%',
    bottom: '0%',
    borderRadius: 40,
    padding: 20,
    flexDirection: 'column',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  eventItem: {
    marginBottom: 24,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    lineHeight: 20,
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'stretch',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EventModal;