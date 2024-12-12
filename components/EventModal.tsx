import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ visible, onClose }) => {
  const colorScheme = useColorScheme();

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

        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Vos événements */}
          <View style={styles.eventItem}>
            <Text
              style={[
                styles.eventTitle,
                { color: Colors[colorScheme ?? 'light'].headerText },
              ]}
            >
              Master Class avec Wong Kar-wai
            </Text>
            <Text
              style={[
                styles.eventDetails,
                { color: Colors[colorScheme ?? 'light'].text },
              ]}
            >
              25 Sept 2024 - 14h00{'\n'}
              UGC Ciné Cité{'\n'}
              Tarif: 15€ (12€ avec Pass Festival)
            </Text>
          </View>
        </ScrollView>

        {/* Bouton de fermeture */}
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
  closeButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventModal;