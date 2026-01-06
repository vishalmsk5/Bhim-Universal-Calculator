import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../store/useThemeStore';
import { useSettingsStore } from '../store/useSettingsStore';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 80) / 4;

interface CalculatorProps {
  onResult?: (result: string) => void;
}

export const BasicCalculator: React.FC<CalculatorProps> = ({ onResult }) => {
  const { theme } = useThemeStore();
  const { hapticEnabled } = useSettingsStore();
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handlePress = (value: string) => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (value === 'C') {
      setDisplay('0');
      setExpression('');
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
      return;
    }

    if (value === '⌫') {
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
      return;
    }

    if (['+', '-', '×', '÷', '%'].includes(value)) {
      if (previousValue !== null && !newNumber) {
        calculate();
      }
      setPreviousValue(parseFloat(display));
      setOperation(value);
      setExpression(`${display} ${value}`);
      setNewNumber(true);
      return;
    }

    if (value === '=') {
      calculate();
      return;
    }

    if (value === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
      return;
    }

    if (value === '+/-') {
      setDisplay((parseFloat(display) * -1).toString());
      return;
    }

    // Number input
    if (newNumber) {
      setDisplay(value);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return;

    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + current;
        break;
      case '-':
        result = previousValue - current;
        break;
      case '×':
        result = previousValue * current;
        break;
      case '÷':
        result = current !== 0 ? previousValue / current : 0;
        break;
      case '%':
        result = previousValue % current;
        break;
    }

    const resultStr = result.toString();
    setDisplay(resultStr);
    setExpression(`${previousValue} ${operation} ${current} =`);
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
    
    if (onResult) {
      onResult(resultStr);
    }
  };

  const buttons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '='],
  ];

  const getButtonStyle = (btn: string) => {
    if (btn === '=') return styles.equalsButton;
    if (['+', '-', '×', '÷', '%'].includes(btn)) return styles.operatorButton;
    if (btn === 'C' || btn === '⌫') return styles.functionButton;
    return styles.numberButton;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={[styles.displayContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.expression, { color: theme.textSecondary }]}>
          {expression}
        </Text>
        <Text style={[styles.display, { color: theme.text }]} numberOfLines={1}>
          {display}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  getButtonStyle(btn),
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
                onPress={() => handlePress(btn)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color:
                        btn === '='
                          ? '#FFFFFF'
                          : ['+', '-', '×', '÷', '%'].includes(btn)
                          ? theme.primary
                          : theme.text,
                    },
                  ]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  displayContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  expression: {
    fontSize: 18,
    marginBottom: 8,
  },
  display: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  numberButton: {},
  operatorButton: {},
  functionButton: {},
  equalsButton: {
    backgroundColor: '#0D47A1',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '600',
  },
});
