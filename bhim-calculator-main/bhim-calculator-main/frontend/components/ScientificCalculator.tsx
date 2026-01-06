import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { evaluate, factorial, log, log10, sqrt, sin, cos, tan, pi, e } from 'mathjs';
import { useThemeStore } from '../store/useThemeStore';
import { useSettingsStore } from '../store/useSettingsStore';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = (width - 80) / 5;

interface ScientificCalculatorProps {
  onResult?: (result: string) => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  onResult,
}) => {
  const { theme } = useThemeStore();
  const { hapticEnabled } = useSettingsStore();
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');

  const handlePress = (value: string) => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    try {
      if (value === 'C') {
        setDisplay('0');
        setExpression('');
        return;
      }

      if (value === '⌫') {
        if (expression.length > 0) {
          const newExpr = expression.slice(0, -1);
          setExpression(newExpr);
          setDisplay(newExpr || '0');
        }
        return;
      }

      if (value === 'DEG/RAD') {
        setAngleMode(angleMode === 'deg' ? 'rad' : 'deg');
        return;
      }

      // Memory functions
      if (value === 'M+') {
        const current = parseFloat(display) || 0;
        setMemory(memory + current);
        return;
      }
      if (value === 'M-') {
        const current = parseFloat(display) || 0;
        setMemory(memory - current);
        return;
      }
      if (value === 'MR') {
        setDisplay(memory.toString());
        setExpression(memory.toString());
        return;
      }
      if (value === 'MC') {
        setMemory(0);
        return;
      }

      // Handle special functions
      if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', '!', 'x²', 'x³', '^'].includes(value)) {
        let result: any;
        const current = parseFloat(display) || 0;
        
        switch (value) {
          case 'sin':
            result = angleMode === 'deg' ? sin((current * pi) / 180) : sin(current);
            break;
          case 'cos':
            result = angleMode === 'deg' ? cos((current * pi) / 180) : cos(current);
            break;
          case 'tan':
            result = angleMode === 'deg' ? tan((current * pi) / 180) : tan(current);
            break;
          case 'log':
            result = log10(current);
            break;
          case 'ln':
            result = log(current, e);
            break;
          case 'sqrt':
            result = sqrt(current);
            break;
          case '!':
            result = factorial(Math.floor(current));
            break;
          case 'x²':
            result = current * current;
            break;
          case 'x³':
            result = current * current * current;
            break;
          case '^':
            // Add ^ operator to expression for power
            const newExpr = expression + '^';
            setExpression(newExpr);
            setDisplay(newExpr);
            return;
        }
        
        setDisplay(result.toString());
        setExpression(result.toString());
        if (onResult) onResult(result.toString());
        return;
      }

      // Handle constants
      if (value === 'π') {
        const newExpr = expression + pi.toString();
        setExpression(newExpr);
        setDisplay(pi.toString());
        return;
      }
      if (value === 'e') {
        const newExpr = expression + e.toString();
        setExpression(newExpr);
        setDisplay(e.toString());
        return;
      }

      // Handle equals
      if (value === '=') {
        if (expression) {
          const result = evaluate(expression);
          setDisplay(result.toString());
          setExpression(result.toString());
          if (onResult) onResult(result.toString());
        }
        return;
      }

      // Handle operators and numbers
      const newExpr = expression === '0' ? value : expression + value;
      setExpression(newExpr);
      setDisplay(newExpr);
      
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const buttons = [
    ['C', angleMode.toUpperCase(), 'MC', 'MR', 'M+'],
    ['sin', 'cos', 'tan', 'log', 'ln'],
    ['x²', 'x³', 'sqrt', '!', 'π'],
    ['7', '8', '9', '÷', 'e'],
    ['4', '5', '6', '×', 'M-'],
    ['1', '2', '3', '-', '('],
    ['0', '.', '=', '+', ')'],
  ];

  const getButtonStyle = (btn: string) => {
    if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x²', 'x³', '!', 'π', 'e'].includes(btn)) {
      return { backgroundColor: theme.primary, textColor: '#FFFFFF' };
    }
    if (['+', '-', '×', '÷'].includes(btn)) {
      return { backgroundColor: theme.accent, textColor: '#FFFFFF' };
    }
    return { backgroundColor: theme.surface, textColor: theme.text };
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.displayContainer, { backgroundColor: theme.surface }]}>
        <View style={styles.infoRow}>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {angleMode.toUpperCase()} | M: {memory}
          </Text>
        </View>
        <Text style={[styles.display, { color: theme.text }]} numberOfLines={1}>
          {display}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((btn) => {
              const btnStyle = getButtonStyle(btn);
              return (
                <TouchableOpacity
                  key={btn}
                  style={[
                    styles.button,
                    { backgroundColor: btnStyle.backgroundColor, borderColor: theme.border },
                  ]}
                  onPress={() => handlePress(btn === angleMode.toUpperCase() ? 'DEG/RAD' : btn)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { color: btnStyle.textColor, fontSize: btn.length > 2 ? 16 : 20 },
                    ]}
                  >
                    {btn}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  displayContainer: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    minHeight: 100,
    justifyContent: 'flex-end',
  },
  infoRow: {
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  display: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    width: BUTTON_SIZE - 2,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: '600',
  },
});
