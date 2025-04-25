// src/screens/Meditation/MeditationScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const MeditationScreen = () => {
  // State to track meditation session
  const [isActive, setIsActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  
  // Format time (seconds) to mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Start or pause meditation
  const toggleMeditation = () => {
    if (isActive) {
      // Pause meditation
      clearInterval(timerInterval);
      setTimerInterval(null);
      setIsActive(false);
    } else {
      // Start meditation
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      setIsActive(true);
    }
  };
  
  // Reset meditation session
  const resetMeditation = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setIsActive(false);
    setSessionTime(0);
  };
  
  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>מדיטציה יומית</Text>
      </View>
      
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(sessionTime)}</Text>
      </View>
      
      <View style={styles.meditationImageContainer}>
        {/* Placeholder for meditation image - you could use an actual image here */}
        <View style={styles.placeholderImage}>
          <Ionicons name="flower-outline" size={120} color={COLORS.secondary} />
          <Text style={styles.meditationText}>
            {isActive 
              ? 'התמקד בנשימה שלך...' 
              : 'מדיטציה יומית תעזור לך להירגע ולהתמקד'}
          </Text>
        </View>
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlButton, styles.secondaryButton]}
          onPress={resetMeditation}
          disabled={sessionTime === 0}
        >
          <Ionicons 
            name="refresh" 
            size={24} 
            color={sessionTime === 0 ? COLORS.textLight : COLORS.text} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.primaryButton]}
          onPress={toggleMeditation}
        >
          <Ionicons 
            name={isActive ? "pause" : "play"} 
            size={24} 
            color="#FFFFFF"
          />
          <Text style={styles.primaryButtonText}>
            {isActive ? 'השהה' : 'התחל'}
          </Text>
        </TouchableOpacity>
        
        <View style={[styles.controlButton, styles.placeholderButton]}></View>
      </View>
      
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>טיפים למדיטציה</Text>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
          <Text style={styles.tipText}>מצא מקום שקט ונוח</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
          <Text style={styles.tipText}>שב בתנוחה נוחה עם גב ישר</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
          <Text style={styles.tipText}>התמקד בנשימות שלך, נשום לאט ועמוק</Text>
        </View>
        <View style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.accent} />
          <Text style={styles.tipText}>אל תשפוט את המחשבות שלך, פשוט תן להן לחלוף</Text>
        </View>
      </View>
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
  timerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.large,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  meditationImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.large,
  },
  placeholderImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  meditationText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SPACING.small,
    paddingHorizontal: SPACING.large,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: SPACING.large,
    paddingHorizontal: SPACING.regular,
  },
  controlButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingHorizontal: SPACING.large,
    width: 120,
  },
  secondaryButton: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  placeholderButton: {
    backgroundColor: 'transparent',
  },
  primaryButtonText: {
    marginLeft: SPACING.small,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipsContainer: {
    padding: SPACING.regular,
    marginBottom: SPACING.large,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginHorizontal: SPACING.regular,
  },
  tipsTitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  tipText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    marginLeft: SPACING.small,
  },
});

export default MeditationScreen;