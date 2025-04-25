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
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>הגדרות</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Notification settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>התראות</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>התראות</Text>
              <Text style={styles.settingDescription}>קבל התראות מהאפליקציה</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>תזכורת יומית</Text>
              <Text style={styles.settingDescription}>קבל תזכורת יומית לעדכון היומן</Text>
            </View>
            <Switch
              value={dailyReminderEnabled}
              onValueChange={setDailyReminderEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor="#FFFFFF"
              disabled={!notificationsEnabled}
            />
          </View>
        </View>
        
        {/* Appearance settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>תצוגה</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>מצב כהה</Text>
              <Text style={styles.settingDescription}>שימוש בערכת צבעים כהה</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        {/* Account actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>חשבון</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>מחק את כל הנתונים</Text>
            <Ionicons name="trash-outline" size={24} color={COLORS.error} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>איפוס סטטיסטיקות</Text>
            <Ionicons name="refresh-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        {/* App info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>אודות</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>תנאי שימוש</Text>
            <Ionicons name="document-text-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionTitle}>מדיניות פרטיות</Text>
            <Ionicons name="shield-checkmark-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
          
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>גרסה 1.0.0</Text>
          </View>
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
  header: {
    alignItems: 'center',
    marginVertical: SPACING.large,
  },
  headerTitle: {
    fontSize: FONT_SIZES.header,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: SPACING.regular,
  },
  section: {
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    marginBottom: SPACING.small,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'right',
  },
  settingDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    textAlign: 'right',
    marginTop: 2,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionTitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    fontWeight: '500',
    textAlign: 'right',
  },
  versionInfo: {
    alignItems: 'center',
    marginTop: SPACING.large,
  },
  versionText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
});

export default SettingsScreen;