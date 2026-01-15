import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
//  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Modal,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useThemeStore } from '../store/useThemeStore';
import axios from 'axios';

import { SafeAreaView } from 'react-native-safe-area-context';

//const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
//const BACKEND_URL = "http://127.0.0.1:8000"; // PC IP on same WiFi
const BACKEND_URL = "https://bhim-universal-calculator.onrender.com/api";
export default function VoicePage() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    // For now, we'll use Alert.prompt as a workaround for voice input
    // In production, you would use expo-av or react-native-voice
    setPermissionGranted(true);
  };

  const handleVoiceInput = async () => {
    if (!permissionGranted) {
      Alert.alert(
        'Permission Required',
        'Microphone permission is needed for voice input. Please enable it in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Retry', onPress: checkPermissions },
        ]
      );
      return;
    }

    try {
      setIsListening(true);
      
      // Show input modal instead of Alert.prompt (which doesn't work on web/Android)
      setShowInputModal(true);
      setIsListening(false);
    } catch (error) {
      console.error('Voice input error:', error);
      Alert.alert(
        'Error',
        'Failed to start voice input. Please try again or type your query.',
        [{ text: 'OK', onPress: () => setIsListening(false) }]
      );
      setIsListening(false);
    }
  };

  //const processVoiceQuery = async (query: string) => {
   const processVoiceQuery = async (text: string) => { // इथे 'text' नाव द्या

    setLoading(true);
    try {
   // BACKEND_URL ची खात्री करा: http://127.0.0.1:8000
    //    const response = await axios.post(`${BACKEND_URL}/api/voice`, {
            const response = await axios.post(${BACKEND_URL}/ai/voice-calculate, {
      query: text // फंक्शनमधील 'text' इथे पास करा
        }, {


   //  const response = await axios.post(`${BACKEND_URL}/api/voice`, { query }, {
 // timeout: 10000,
//  headers: { 'Content-Type': 'application/json' },
  // });

// ही ओळ अशी अपडेट करा
//const response = await axios.post(`${BACKEND_URL}/api/voice`, {
 // query: text // इथे खात्री करा की तुम्ही युजरने बोललेला 'text' पाठवत आहात
//}, {
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});
      const answer = response.data.result;
      setResult(answer);

      // Speak the result
      if (await Speech.isSpeakingAsync()) {
        await Speech.stop();
      }
      Speech.speak(answer, {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
      });
//    } catch (error: any) {
  // Remove console.error to prevent RedBox
//  console.log('Voice calculation error (silent):', error);
//
//  let errorMessage = 'Sorry, I could not process your request.';
//
//  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
//    errorMessage = 'Request timed out. Please check your internet connection.';
//  } else if (error.response) {
//    errorMessage = `Server error: ${error.response.data?.message || 'Unknown server error'}`;
//  } else if (error.request) {
//    errorMessage = 'No response from server. Please check your internet connection.';
//  }
//
//  setResult(errorMessage);
  
  // Alert kept as is (UI unchanged)
//  Alert.alert('Error', errorMessage, [
//    { text: 'Retry', onPress: () => processVoiceQuery(query) },
//    { text: 'OK' },
//  ]);


}catch (error) {
        console.error("Error details:", error);
        setResult("Sorry, I could not process your request.");
} finally {

 setLoading(false);
}
  };

  const handleExamplePress = (example: string) => {
    setTranscript(example);
    processVoiceQuery(example);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'AI Voice Calculator',
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: '#FFFFFF',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 8 }}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Permission Status */}
          {!permissionGranted && (
            <View style={[styles.permissionCard, { backgroundColor: theme.error }]}>
              <Ionicons name="warning" size={24} color="#FFFFFF" />
              <Text style={styles.permissionText}>
                Microphone permission required. Tap the mic button to enable.
              </Text>
            </View>
          )}

          {/* Voice Input Button */}
          <View style={styles.voiceSection}>
            <TouchableOpacity
              style={[
                styles.voiceButton,
                { backgroundColor: theme.primary },
                isListening && styles.listeningButton,
              ]}
              onPress={handleVoiceInput}
              disabled={loading}
            >
              <Ionicons
                name={isListening ? 'mic' : 'mic-outline'}
                size={64}
                color="#FFFFFF"
              />
            </TouchableOpacity>
            <Text style={[styles.voiceLabel, { color: theme.text }]}>
              {loading ? 'Processing...' : isListening ? 'Listening...' : 'Tap to speak'}
            </Text>
          </View>

          {/* Transcript */}
          {transcript ? (
            <View style={[styles.card, { backgroundColor: theme.surface }]}>
              <Text style={[styles.cardTitle, { color: theme.primary }]}>You asked:</Text>
              <Text style={[styles.cardContent, { color: theme.text }]}>{transcript}</Text>
            </View>
          ) : null}

          {/* Result */}
          {result ? (
            <View style={[styles.card, { backgroundColor: theme.primary }]}>
              <Text style={[styles.cardTitle, { color: '#FFC107' }]}>Answer:</Text>
              <Text style={[styles.resultText, { color: '#FFFFFF' }]}>{result}</Text>
            </View>
          ) : null}

          {/* Examples */}
          <View style={styles.examplesSection}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Try asking:</Text>
            {[
              'What is 45 plus 18 percent of 200?',
              'Calculate square root of 144',
              'What is 25 times 4 divided by 2?',
              'What is 15 percent of 500?',
              'Calculate 5 factorial',
              'What is 2 to the power of 10?',
            ].map((example, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.exampleCard, { backgroundColor: theme.surface }]}
                onPress={() => handleExamplePress(example)}
                disabled={loading}
              >
                <Ionicons name="bulb-outline" size={20} color={theme.accent} />
                <Text style={[styles.exampleText, { color: theme.text }]}>{example}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Instructions */}
          <View style={[styles.instructionsCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="information-circle" size={24} color={theme.primary} />
            <View style={styles.instructionsContent}>
              <Text style={[styles.instructionsTitle, { color: theme.text }]}>
                How to use:
              </Text>
              <Text style={[styles.instructionsText, { color: theme.textSecondary }]}>
                1. Tap the microphone button{' \n'}
                2. Type or speak your math question{' \n'}
                3. Get instant AI-powered answer{' \n'}
                4. Result will be spoken aloud
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Input Modal */}
        <Modal
          visible={showInputModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowInputModal(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalOverlay}
          >
            <View style={[styles.modalContent, { backgroundColor: theme.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  Voice Calculator
                </Text>
                <TouchableOpacity onPress={() => setShowInputModal(false)}>
                  <Ionicons name="close" size={28} color={theme.text} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.modalLabel, { color: theme.textSecondary }]}>
                Type your calculation:
              </Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.background, color: theme.text }]}
                placeholder='e.g., "What is 45 plus 18 percent of 200?"'
                placeholderTextColor={theme.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
                numberOfLines={3}
                autoFocus
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton, { borderColor: theme.border }]}
                  onPress={() => {
                    setShowInputModal(false);
                    setInputText('');
                  }}
                >
                  <Text style={[styles.buttonText, { color: theme.text }]}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.calculateButton, { backgroundColor: theme.primary }]}
                  onPress={async () => {
                    if (inputText.trim()) {
                      setShowInputModal(false);
                      setTranscript(inputText);
                      await processVoiceQuery(inputText);
                      setInputText('');
                    }
                  }}
                  disabled={!inputText.trim()}
                >
                  <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Calculate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  permissionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  permissionText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  voiceSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  voiceButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  listeningButton: {
    transform: [{ scale: 1.1 }],
  },
  voiceLabel: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 18,
    lineHeight: 26,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  examplesSection: {
    width: '100%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
  },
  instructionsCard: {
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 12,
  },
  instructionsContent: {
    flex: 1,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    lineHeight: 20,
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
    maxWidth: 500,
    borderRadius: 20,
    padding: 24,
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
  modalLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalInput: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  calculateButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
