import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Modal,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  AccessibilityInfo,
  findNodeHandle
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  price: string;
}

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  openerRef: React.RefObject<React.ElementRef<typeof TouchableOpacity>>;
}

const EventModal: React.FC<EventModalProps> = ({ visible, onClose, openerRef }) => {
  const colorScheme = useColorScheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const consultezRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);

  const modalRef = useRef<View>(null);
  const titleRef = useRef<View>(null);

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
      setTimeout(() => {
        if (modalRef.current) {
          const node = findNodeHandle(modalRef.current);
          if (node) {
            AccessibilityInfo.setAccessibilityFocus(node);
          }
        }
      }, 100);
    }
  }, [visible]);

  const handleClose = () => {
    onClose();
    // Optionally, set focus back to the opener element
    if (openerRef.current) {
      const node = findNodeHandle(openerRef.current);
      if (node) {
        AccessibilityInfo.setAccessibilityFocus(node);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const setFocus = () => {
        setTimeout(() => {
          if (consultezRef.current) {
            const nodeHandle = findNodeHandle(consultezRef.current);
            if (nodeHandle) {
              AccessibilityInfo.setAccessibilityFocus(nodeHandle);
            }
          }
        }, 100);
      };
      setFocus();
    }, [])
  );

  // if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      accessible={true}
      accessibilityViewIsModal={true}
      accessibilityLabel="Contenu de la modal des événements"
    >

      <View style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={onClose}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Fermer la modal">
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
          ]}
          ref={modalRef}
        // accessible={true}
        // // accessibilityRole="dialog"
        // accessibilityViewIsModal={true}
        // accessibilityLabel="Contenu de la modal des événements"
        >
          <Text
            style={[
              styles.modalTitle,
              { color: Colors[colorScheme ?? 'light'].headerText },
            ]}
            ref={consultezRef}
            accessible={true}
            accessibilityRole="header"
            accessibilityLabel="Titre des événements du Festival"

          >
            Événements du Festival
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].headerText}
              accessible={true}
              accessibilityLabel="Chargement des événements" />
          ) : events.length > 0 ? (
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}
            // accessible={true}
            // accessibilityRole="scrollbar"
            // accessibilityLabel="Liste des événements"
            >
              {events.map((event) => (
                <View key={event._id} style={styles.eventItem}>
                  <Text
                    style={[
                      styles.eventTitle,
                      { color: Colors[colorScheme ?? 'light'].headerText },
                    ]}
                    accessible={true}
                    accessibilityRole="header"
                    accessibilityLabel={`Titre de l'événement: ${event.title}`}
                  >
                    {event.title}
                  </Text>
                  <Text
                    style={[
                      styles.eventDetails,
                      { color: Colors[colorScheme ?? 'light'].text },
                    ]}
                    accessible={true}
                    accessibilityRole="text"
                    accessibilityLabel={`Date: ${event.date}, Lieu: ${event.location}, Tarif: 15€`}
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
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel="Aucun événement disponible"
            >
              Aucun événement disponible.
            </Text>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Fermer le modal"
            accessibilityHint="Appuyez pour fermer la fenêtre des événements"
          >
            <Text style={styles.closeButtonText}
            // accessible={true}
            // accessibilityRole="text"
            // accessibilityLabel="Fermer"
            >Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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