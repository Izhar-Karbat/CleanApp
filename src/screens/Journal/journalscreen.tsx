// src/screens/Journal/JournalScreen.tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const JournalScreen = () => {
  // Placeholder for journal prompt - would come from a list in a real app
  const todayPrompt = "איך הרגשת היום כשהתעוררת?";
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>יומן יומי</Text>
      </View>
      
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>{todayPrompt}</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.journalInput}
          multiline={true}
          placeholder="השתף ברגשות ובמחשבות שלך..."
          placeholderTextColor={COLORS.textLight}
          textAlignVertical="top"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>שמור רשומה</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.skipButton}>
          <Text style={styles.skipButtonText}>היום לא בא לי לכתוב</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.regular,
  },
  header: {
    alignItems: 'center',
    marginVertical: SPACING.large,
  },
  headerTitle: {
    fontSize: FONT_SIZES.header,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  promptContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  promptText: {
    fontSize: FONT_SIZES.large,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    marginBottom: SPACING.large,
  },
  journalInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: SPACING.regular,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    textAlign: 'right',
    minHeight: 200,
  },
  buttonContainer: {
    marginBottom: SPACING.large,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.medium,
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  saveButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  skipButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: SPACING.medium,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skipButtonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
  },
});

export default JournalScreen;