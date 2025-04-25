// src/screens/Home/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

// Import theme (you'll need to create this file)
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

// Timer display component
const TimerSection = ({ days, hours, minutes, seconds }) => {
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerTitle}>זמן נקי</Text>
      <View style={styles.timerRow}>
        <View style={styles.timerBlock}>
          <Text style={styles.timerValue}>{days}</Text>
          <Text style={styles.timerLabel}>ימים</Text>
        </View>
        <View style={styles.timerBlock}>
          <Text style={styles.timerValue}>{hours}</Text>
          <Text style={styles.timerLabel}>שעות</Text>
        </View>
        <View style={styles.timerBlock}>
          <Text style={styles.timerValue}>{minutes}</Text>
          <Text style={styles.timerLabel}>דקות</Text>
        </View>
        <View style={styles.timerBlock}>
          <Text style={styles.timerValue}>{seconds}</Text>
          <Text style={styles.timerLabel}>שניות</Text>
        </View>
      </View>
    </View>
  );
};

// Money saved section
const MoneySavedSection = ({ amount }) => {
  return (
    <View style={styles.moneySavedContainer}>
      <Text style={styles.sectionTitle}>כסף שנחסך</Text>
      <View style={styles.moneyDisplay}>
        <Text style={styles.moneyValue}>{amount}</Text>
        <Text style={styles.moneyCurrency}>₪</Text>
      </View>
    </View>
  );
};

// Daily inspiration section
const InspirationSection = ({ quote }) => {
  return (
    <View style={styles.inspirationContainer}>
      <Text style={styles.sectionTitle}>השראה יומית</Text>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>"{quote}"</Text>
      </View>
    </View>
  );
};

// Action button component
const ActionButton = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={24} color={COLORS.primary} />
      <Text style={styles.actionButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // State for timer
  const [timeClean, setTimeClean] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // State for money saved
  const [moneySaved, setMoneySaved] = useState(0);
  
  // Daily quote (in a real app, this would come from a backend or rotating list)
  const [quote, setQuote] = useState('כל יום נקי הוא ניצחון שמוביל אל החופש.');
  
  // Mock data (in a real app, this would come from storage or context)
  // Start date - 5 days ago from now
  const startDate = new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000);
  // Daily cost of cannabis use
  const dailyCost = 50; // 50 NIS per day
  
  // Calculate time clean and money saved
  useEffect(() => {
    // Function to update the timer
    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      // Calculate time components
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeClean({ days, hours, minutes, seconds });
      
      // Calculate money saved
      const totalDays = diff / (1000 * 60 * 60 * 24);
      setMoneySaved(Math.floor(totalDays * dailyCost));
    };
    
    // Update immediately
    updateTimer();
    
    // Set interval to update every second
    const timerId = setInterval(updateTimer, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timerId);
  }, [startDate, dailyCost]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>נקי</Text>
        </View>
        
        {/* Clean timer section */}
        <TimerSection 
          days={timeClean.days}
          hours={timeClean.hours}
          minutes={timeClean.minutes}
          seconds={timeClean.seconds}
        />
        
        {/* Money saved section */}
        <MoneySavedSection amount={moneySaved} />
        
        {/* Daily inspiration section */}
        <InspirationSection quote={quote} />
        
        {/* Action buttons */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionRow}>
            <ActionButton 
              title="יומן" 
              icon="journal-outline" 
              onPress={() => navigation.navigate('Journal')} 
            />
            <ActionButton 
              title="חיזוק" 
              icon="star-outline" 
              onPress={() => navigation.navigate('Reinforcement')} 
            />
          </View>
          
          {/* SOS Button */}
          <TouchableOpacity 
            style={styles.sosButton}
            onPress={() => navigation.navigate('SOS')}
          >
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
          
          <View style={styles.actionRow}>
            <ActionButton 
              title="מדיטציה" 
              icon="flower-outline" 
              onPress={() => navigation.navigate('Meditation')} 
            />
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
  scrollContent: {
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
  timerContainer: {
    marginBottom: SPACING.large,
    alignItems: 'center',
  },
  timerTitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.small,
    fontWeight: '600',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  timerBlock: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.medium,
    minWidth: 70,
  },
  timerValue: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerLabel: {
    fontSize: FONT_SIZES.small,
    color: '#FFFFFF',
  },
  moneySavedContainer: {
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    marginBottom: SPACING.small,
    fontWeight: '600',
  },
  moneyDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  moneyValue: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  moneyCurrency: {
    fontSize: FONT_SIZES.large,
    color: COLORS.accent,
    marginLeft: 2,
  },
  inspirationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  quoteContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: SPACING.regular,
    width: '100%',
  },
  quoteText: {
    fontSize: FONT_SIZES.medium,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionsContainer: {
    marginBottom: SPACING.large,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.medium,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: SPACING.medium,
    width: '48%',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  actionButtonText: {
    marginLeft: SPACING.small,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  sosButton: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    padding: SPACING.medium,
    alignItems: 'center',
    marginVertical: SPACING.medium,
  },
  sosButtonText: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HomeScreen;