import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { useThemeStore } from '../store/useThemeStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { themes, ThemeName } from '../constants/themes';
import { languages, LanguageCode } from '../constants/languages';
import { QuoteOfDay } from '../components/QuoteOfDay';
import { BasicCalculator } from '../components/BasicCalculator';
import { ScientificCalculator } from '../components/ScientificCalculator';

export default function Index() {
  const router = useRouter();
  const { theme, themeName, setTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const {
    soundEnabled,
    hapticEnabled,
    jaiBlimGreeting,
    showAmbedkarWatermark,
    setSoundEnabled,
    setHapticEnabled,
    setJaiBlimGreeting,
    setShowAmbedkarWatermark,
    loadSettings,
  } = useSettingsStore();
  const [mode, setMode] = useState<'basic' | 'scientific'>('basic');

  // Load settings on app start
  useEffect(() => {
    loadSettings();
  }, []);

  // Show Jai Bhim greeting if enabled
  useEffect(() => {
    if (jaiBlimGreeting) {
      // Play greeting sound using expo-speech
      Speech.speak('Jai Bhim! Welcome to Bhim Universal Calculator', {
        language: 'en',
        pitch: 1.0,
        rate: 0.9,
      });
      console.log('🙏 Jai Bhim! Welcome to Bhim Universal Calculator');
    }
  }, [jaiBlimGreeting]);

  // Handle toggle with haptic feedback
  const handleToggle = async (
    toggleFn: (value: boolean) => Promise<void>,
    currentValue: boolean
  ) => {
    if (hapticEnabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await toggleFn(!currentValue);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Babasaheb Watermark - shown behind all content */}
        {showAmbedkarWatermark && (
          <View style={styles.watermarkContainer}>
            <Ionicons 
              name="person" 
              size={200} 
              color={theme.textSecondary} 
              style={styles.watermarkIcon}
            />
            <Text style={[styles.watermarkText, { color: theme.textSecondary }]}>
              Dr. B.R. Ambedkar
            </Text>
          </View>
        )}
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: theme.primary }]}>
            <View style={styles.headerContent}>
              <Ionicons name="calculator" size={32} color="#FFC107" />
              <Text style={styles.title}>Bhim Universal Calculator</Text>
            </View>
            <Text style={styles.subtitle}>Inspired by Dr. B.R. Ambedkar</Text>
          </View>

          {/* Quote of the Day */}
          <View style={styles.quoteSection}>
            <QuoteOfDay />
          </View>

          {/* Mode Switcher */}
          <View style={styles.modeSwitcher}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === 'basic' && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
                { borderColor: theme.border },
              ]}
              onPress={() => setMode('basic')}
            >
              <Text
                style={[
                  styles.modeButtonText,
                  { color: mode === 'basic' ? '#FFFFFF' : theme.text },
                ]}
              >
                Basic
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === 'scientific' && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
                { borderColor: theme.border },
              ]}
              onPress={() => setMode('scientific')}
            >
              <Text
                style={[
                  styles.modeButtonText,
                  { color: mode === 'scientific' ? '#FFFFFF' : theme.text },
                ]}
              >
                Scientific
              </Text>
            </TouchableOpacity>
          </View>

          {/* Calculator */}
          <View style={styles.calculatorSection}>
            {mode === 'basic' ? <BasicCalculator /> : <ScientificCalculator />}
          </View>

          {/* Quick Access Navigation */}
          <View style={styles.quickAccess}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Access</Text>
            <View style={styles.quickAccessGrid}>
              <TouchableOpacity
                style={[styles.quickAccessCard, { backgroundColor: theme.surface }]}
                onPress={() => router.push('/voice')}
              >
                <Ionicons name="mic" size={32} color={theme.primary} />
                <Text style={[styles.quickAccessText, { color: theme.text }]}>AI Voice</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickAccessCard, { backgroundColor: theme.surface }]}
                onPress={() => router.push('/business')}
              >
                <Ionicons name="briefcase" size={32} color={theme.accent} />
                <Text style={[styles.quickAccessText, { color: theme.text }]}>
                  Business Tools
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickAccessCard, { backgroundColor: theme.surface }]}
                onPress={() => router.push('/explore')}
              >
                <Ionicons name="apps" size={32} color={theme.primary} />
                <Text style={[styles.quickAccessText, { color: theme.text }]}>Explore</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickAccessCard, { backgroundColor: theme.surface }]}
                onPress={() => router.push('/settings')}
              >
                <Ionicons name="settings" size={32} color={theme.textSecondary} />
                <Text style={[styles.quickAccessText, { color: theme.text }]}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Theme Selector */}
          <View style={styles.themeSelector}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Choose Theme</Text>
            <View style={styles.themeGrid}>
              {(Object.keys(themes) as ThemeName[]).map((name) => (
                <TouchableOpacity
                  key={name}
                  style={[
                    styles.themeCard,
                    { backgroundColor: themes[name].primary },
                    themeName === name && styles.selectedTheme,
                  ]}
                  onPress={() => setTheme(name)}
                >
                  <Text style={styles.themeName}>
                    {name === 'deepBlue'
                      ? 'Deep Blue'
                      : name === 'constitutionGold'
                      ? 'Constitution Gold'
                      : name === 'nightMode'
                      ? 'Night Mode'
                      : 'Gradient Glow'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Settings Preview */}
          <View style={[styles.settingsPreview, { backgroundColor: theme.surface }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Quick Settings</Text>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Sound Feedback</Text>
              <Switch
                value={soundEnabled}
                onValueChange={() => handleToggle(setSoundEnabled, soundEnabled)}
                trackColor={{ false: theme.border, true: theme.primary }}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Haptic Feedback</Text>
              <Switch
                value={hapticEnabled}
                onValueChange={() => handleToggle(setHapticEnabled, hapticEnabled)}
                trackColor={{ false: theme.border, true: theme.primary }}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>Jai Bhim Greeting</Text>
              <Switch
                value={jaiBlimGreeting}
                onValueChange={() => handleToggle(setJaiBlimGreeting, jaiBlimGreeting)}
                trackColor={{ false: theme.border, true: theme.primary }}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              “Educate, Agitate, Organize”
            </Text>
            <Text style={[styles.footerSubtext, { color: theme.textSecondary }]}>
              Free Forever • Made with ❤️ for Everyone
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFC107',
    fontStyle: 'italic',
  },
  quoteSection: {
    paddingHorizontal: 16,
  },
  modeSwitcher: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    gap: 12,
  },
  modeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  calculatorSection: {
    minHeight: 500,
    marginBottom: 24,
  },
  quickAccess: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickAccessText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  themeSelector: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedTheme: {
    borderColor: '#FFC107',
  },
  themeName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  settingsPreview: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
  },
  watermarkContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.08,
    zIndex: 0,
  },
  watermarkIcon: {
    opacity: 0.5,
  },
  watermarkText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    opacity: 0.7,
  },
});
