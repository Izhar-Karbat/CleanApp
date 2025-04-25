// src/screens/SOS/SOSScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const SOSScreen = ({ navigation }) => {
  // State for the breathing exercise
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [counter, setCounter] = useState(4);
  
  // Calming messages to display
  const calmingMessages = [
    'הקושי הזה יחלוף. אתה חזק יותר ממה שאתה חושב.',
    'נשום עמוק, הכל יהיה בסדר.',
    'אתה בוחר בעצמך ובבריאות שלך.',
    'כל רגע של שליטה הוא ניצחון.',
    'אתה לא לבד בתהליך הזה.'
  ];
  
  // Current message
  const [currentMessage, setCurrentMessage] = useState(calmingMessages[0]);
  
  // Animation value for breathing circle
  const breathAnimation = React.useRef(new Animated.Value(1)).current;
  
  // Set up breathing animation
  useEffect(() => {
    if (breathPhase === 'inhale') {
      // Inhale animation (grow)
      Animated.timing(breathAnimation, {
        toValue: 1.5,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }).start();
      
      // Counter for inhale
      let count = 4;
      const timer = setInterval(() => {
        count--;
        setCounter(count);
        if (count === 0) {
          clearInterval(timer);
          setBreathPhase('hold');
          setCounter(4);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    } 
    else if (breathPhase === 'hold') {
      // Hold breath
      let count = 4;
      const timer = setInterval(() => {
        count--;
        setCounter(count);
        if (count === 0) {
          clearInterval(timer);
          setBreathPhase('exhale');
          setCounter(6);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    } 
    else if (breathPhase === 'exhale') {
      // Exhale animation (shrink)
      Animated.timing(breathAnimation, {
        toValue: 1,
        duration: 6000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true
      }).start();
      
      // Counter for exhale
      let count = 6;
      const timer = setInterval(() => {
        count--;
        setCounter(count);
        if (count === 0) {
          clearInterval(timer);
          setBreathPhase('inhale');
          setCounter(4);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [breathPhase]);
  
  // Change calming message every 10 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * calmingMessages.length);
      setCurrentMessage(calmingMessages[randomIndex]);
    }, 10000);
    
    return () => clearInterval(messageInterval);
  }, []);
  
  // Get breathing instructions based on current phase
  const getBreathingInstruction = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'נשום פנימה...';
      case 'hold':
        return 'החזק...';
      case 'exhale':
        return 'נשוף החוצה...';
      default:
        return '';
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Breathing Exercise */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>תרגיל נשימה</Text>
          <Text style={styles.instructions}>
            שאף אוויר למשך 4 שניות, החזק למשך 4 שניות, ונשוף למשך 6 שניות
          </Text>
          
          <View style={styles.breathingContainer}>
            <Animated.View
              style={[
                styles.breathCircle,
                {
                  transform: [{ scale: breathAnimation }]
                }
              ]}
            />
            <Text style={styles.breathPhaseText}>{getBreathingInstruction()}</Text>
            <Text style={styles.counterText}>{counter}</Text>
          </View>
        </View>
        
        {/* Calming Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{currentMessage}</Text>
        </View>
        
        {/* Motivational Content Button */}
        <TouchableOpacity style={styles.motivationButton}>
          <Ionicons name="play-circle" size={24} color="#FFFFFF" />
          <Text style={styles.motivationButtonText}>צפה בתוכן מחזק</Text>
        </TouchableOpacity>
        
        {/* Return Button */}
        <TouchableOpacity 
          style={styles.returnButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.returnButtonText}>חזרה למסך הבית</Text>
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
  content: {
    padding: SPACING.regular,
    alignItems: 'center',
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: SPACING.large,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  instructions: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: SPACING.medium,
  },
  breathingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '100%',
  },
  breathCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primary,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathPhaseText: {
    position: 'absolute',
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  counterText: {
    position: 'absolute',
    bottom: 20,
    fontSize: FONT_SIZES.xxlarge,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  messageContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: SPACING.large,
    width: '100%',
    marginBottom: SPACING.large,
  },
  messageText: {
    fontSize: FONT_SIZES.medium,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  motivationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    padding: SPACING.medium,
    width: '100%',
    marginBottom: SPACING.large,
  },
  motivationButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: SPACING.small,
  },
  returnButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: SPACING.medium,
    width: '100%',
    marginBottom: SPACING.large,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  returnButtonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
});

export default SOSScreen;