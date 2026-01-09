import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../store/useThemeStore';

export default function BusinessPage() {
  const router = useRouter();
  const { theme } = useThemeStore();

  const businessTools = [
    { id: 'emi', icon: 'card', title: 'EMI Calculator', route: '/mini/emi' },
    { id: 'gst', icon: 'calculator', title: 'GST Calculator', route: '/mini/gst' },
    { id: 'currency', icon: 'cash', title: 'Currency Converter', route: '/mini/currency' },
    { id: 'discount', icon: 'pricetag', title: 'Discount Calculator', route: '/mini/discount' },
    { id: 'profit', icon: 'trending-up', title: 'Profit/Loss', route: '/mini/profit' },
    { id: 'split', icon: 'people', title: 'Expense Split', route: '/mini/split' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Business Tools',
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
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            Professional tools for your business calculations
          </Text>

          <View style={styles.grid}>
            {businessTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[styles.toolCard, { backgroundColor: theme.surface }]}
                onPress={() => router.push(tool.route as any)}
              >
                <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
                  <Ionicons name={tool.icon as any} size={32} color="#FFFFFF" />
                </View>
                <Text style={[styles.toolTitle, { color: theme.text }]}>{tool.title}</Text>
              </TouchableOpacity>
            ))}
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
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  toolCard: {
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
