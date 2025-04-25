// src/screens/Reinforcement/ReinforcementScreen.tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const ReinforcementScreen = () => {
  // Sample reinforcement content
  const reinforcements = [
    {
      id: '1',
      title: 'התגברות על רצון עז',
      content: 'נשימה עמוקה, עשה משהו אחר, זכור למה התחלת.'
    },
    {
      id: '2',
      title: 'ניהול מתח',
      content: 'מדיטציה, פעילות גופנית, מוזיקה מרגיעה.'
    },
    {
      id: '3',
      title: 'מחשבות חיוביות',
      content: 'אני חזק יותר מההתמכרות. כל יום נקי הוא ניצחון.'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>חיזוק</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>כלים להתמודדות</Text>
        
        {reinforcements.map(item => (
          <View key={item.id} style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardContent}>{item.content}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>קבל חיזוק נוסף</Text>
        </TouchableOpacity>
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
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.medium,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  cardTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.small,
    textAlign: 'right',
  },
  cardContent: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.text,
    textAlign: 'right',
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.medium,
    alignItems: 'center',
    marginVertical: SPACING.large,
  },
  buttonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ReinforcementScreen;