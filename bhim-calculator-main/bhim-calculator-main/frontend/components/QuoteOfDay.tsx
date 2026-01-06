import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/useThemeStore';
import { getQuoteOfDay } from '../constants/quotes';

export const QuoteOfDay: React.FC = () => {
  const { theme } = useThemeStore();
  const [modalVisible, setModalVisible] = useState(false);
  const quote = getQuoteOfDay();

  return (
    <>
      <TouchableOpacity
        style={[styles.container, { backgroundColor: theme.primary }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="bulb" size={24} color="#FFC107" />
        <Text style={styles.quoteText} numberOfLines={2}>
          {quote}
        </Text>
        <Text style={styles.author}>- Dr. B.R. Ambedkar</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Quote of the Day</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Ionicons name="chatbox-ellipses" size={48} color={theme.primary} style={styles.quoteIcon} />
              <Text style={[styles.modalQuote, { color: theme.text }]}>{quote}</Text>
              <Text style={[styles.modalAuthor, { color: theme.textSecondary }]}>
                - Dr. Bhimrao Ramji Ambedkar
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={[styles.shareButton, { backgroundColor: theme.primary }]}
              onPress={() => {
                // Share functionality can be added here
                setModalVisible(false);
              }}
            >
              <Ionicons name="share-social" size={20} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>Share Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quoteText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  author: {
    fontSize: 12,
    color: '#FFC107',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1,
  },
  quoteIcon: {
    marginBottom: 20,
  },
  modalQuote: {
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 20,
  },
  modalAuthor: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
