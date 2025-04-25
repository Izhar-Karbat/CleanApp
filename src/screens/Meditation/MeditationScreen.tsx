import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const MeditationScreen = () => {
  // Sample meditation sessions
  const meditationSessions = [
    {
      id: '1',
      title: 'מדיטציית הרפיה',
      duration: '5 דקות',
      description: 'מדיטציה קצרה להרגעת הגוף והנפש',
      image: null // We'd normally have an image here
    },
    {
      id: '2',
      title: 'התמודדות עם תשוקה',
      duration: '10 דקות',
      description: 'מדיטציה לזמנים קשים של רצון עז',
      image: null
    },
    {
      id: '3',
      title: 'קבלה עצמית',
      duration: '15 דקות',
      description: 'מדיטציה להגברת האהבה העצמית והקבלה',
      image: null
    },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>מדיטציה</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>מדיטציות להתמודדות</Text>
        
        {meditationSessions.map(session => (
          <View key={session.id} style={styles.meditationCard}>
            <TouchableOpacity 
              style={styles.meditationHeader}
              onPress={() => toggleExpand(session.id)}
            >
              <View style={styles.meditationInfo}>
                <Text style={styles.meditationTitle}>{session.title}</Text>
                <Text style={styles.meditationDuration}>{session.duration}</Text>
              </View>
              <Ionicons 
                name={expandedId === session.id ? "chevron-up" : "chevron-down"} 
                size={24} 
                color={COLORS.primary} 
              />
            </TouchableOpacity>
            
            {expandedId === session.id && (
              <View style={styles.meditationContent}>
                <Text style={styles.meditationDescription}>
                  {session.description}
                </Text>
                <TouchableOpacity style={styles.playButton}>
                  <Ionicons name="play" size={22} color="#FFF" />
                  <Text style={styles.playButtonText}>התחל מדיטציה</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>למה מדיטציה?</Text>
          <Text style={styles.infoText}>
            מדיטציה יכולה לעזור לך להתמודד עם רצונות חזקים, להפחית מתח, ולהגביר
            את היכולת שלך להתמקד במטרות שלך. אפילו 5 דקות ביום יכולות לעשות הבדל.
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
  meditationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: SPACING.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  meditationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.medium,
  },
  meditationInfo: {
    flex: 1,
  },
  meditationTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'right',
  },
  meditationDuration: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    textAlign: 'right',
    marginTop: 2,
  },
  meditationContent: {
    padding: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  meditationDescription: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.text,
    textAlign: 'right',
    marginBottom: SPACING.medium,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: SPACING.small,
  },
  infoCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: SPACING.large,
    marginVertical: SPACING.large,
  },
  infoTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  infoText: {
    fontSize: FONT_SIZES.regular,
    color: '#FFFFFF',
    textAlign: 'right',
    lineHeight: 22,
  },
});

export default MeditationScreen; 