// src/screens/Settings/SettingsScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Switch,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const SettingsScreen = () => {
  // Sample state - in a real app these would be stored in AsyncStorage or context
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)); // 5 days ago
  const [dailyCost, setDailyCost] = useState('50');
  const [showNotifications, setShowNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState(new Date(new Date().setHours(20, 0, 0, 0))); // 8:00 PM
  
  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Format date for display
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // Format time for display
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };
  
  // Handle time change
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(Platform.OS === 'ios');
    setReminderTime(currentTime);
  };
  
  // Reset all data
  const resetData = () => {
    Alert.alert(
      'איפוס נתונים',
      'האם אתה בטוח שברצונך לאפס את כל הנתונים? פעולה זו אינה ניתנת לביטול.',
      [
        {
          text: 'ביטול',
          style: 'cancel'
        },
        {
          text: 'איפוס',
          style: 'destructive',
          onPress: () => {
            // Reset logic would go here - clear AsyncStorage, etc.
            setStartDate(new Date());
            setDailyCost('50');
            Alert.alert('הנתונים אופסו', 'כל הנתונים אופסו בהצלחה.');
          }
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>הגדרות</Text>
        </View>
        
        {/* Clean Timer Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>הגדרות טיימר נקי</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>תאריך התחלה</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
              <Ionicons name="calendar" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()} // Can't set a date in the future
              />
            )}
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>עלות יומית (₪)</Text>
            <TextInput
              style={styles.costInput}
              value={dailyCost}
              onChangeText={setDailyCost}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </View>
        
        {/* Notifications Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>התראות</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>התראות יומיות</Text>
            <Switch
              value={showNotifications}
              onValueChange={setShowNotifications}
              trackColor={{ false: '#D9D9D9', true: COLORS.primary }}
              thumbColor={'#FFFFFF'}
            />
          </View>
          
          {showNotifications && (
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>שעת תזכורת</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateButtonText}>{formatTime(reminderTime)}</Text>
                <Ionicons name="time" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              
              {showTimePicker && (
                <DateTimePicker
                  value={reminderTime}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
          )}
        </View>
        
        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ניהול נתונים</Text>
          
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={resetData}
          >
            <Ionicons name="trash" size={20} color={'#FFFFFF'} />
            <Text style={styles.dangerButtonText}>איפוס כל הנתונים</Text>
          </TouchableOpacity>
        </View>
        
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>אודות</Text>
          
          <Text style={styles.aboutText}>
            נקי - גרסה 1.0.0
          </Text>
          <Text style={styles.aboutText}>
            אפליקציה לתמיכה בתהליך גמילה מקנאביס
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
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
  section: {
    marginBottom: SPACING.large,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: SPACING.regular,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateButtonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    marginRight: SPACING.small,
  },
  costInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 100,
    textAlign: 'center',
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.error,
    borderRadius: 12,
    padding: SPACING.medium,
    marginTop: SPACING.small,
  },
  dangerButtonText: {
    marginLeft: SPACING.small,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  aboutText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.small,
  },
});

export default SettingsScreen;