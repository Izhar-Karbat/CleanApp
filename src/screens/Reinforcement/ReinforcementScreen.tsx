// src/screens/Reinforcement/ReinforcementScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

const ReinforcementScreen = () => {
  // Sample quotes for reinforcement
  const quotes = [
    'כל יום נקי הוא ניצחון שמוביל אל החופש.',
    'אתה יותר חזק מכל תשוקה או צורך.',
    'הבחירה שלך היום מעצבת את המחר שלך.',
    'למרות הקושי, אתה בוחר בחיים בריאים יותר.',
    'כל נשימה נקייה היא מתנה לגוף ולנפש שלך.'
  ];
  
  // State for favorites
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Daily quote - in a real app, this would rotate daily
  const [dailyQuote, setDailyQuote] = useState(quotes[0]);
  
  // Toggle favorite
  const toggleFavorite = (quote) => {
    if (favorites.includes(quote)) {
      setFavorites(favorites.filter(q => q !== quote));
    } else {
      setFavorites([...favorites, quote]);
    }
  };
  
  // Check if a quote is favorite
  const isFavorite = (quote) => {
    return favorites.includes(quote);
  };
  
  // Render a quote card
  const renderQuoteCard = (quote) => {
    return (
      <View style={styles.quoteCard} key={quote}>
        <Text style={styles.quoteText}>{quote}</Text>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(quote)}
        >
          <Ionicons 
            name={isFavorite(quote) ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite(quote) ? COLORS.error : COLORS.text} 
          />
          <Text style={styles.favoriteButtonText}>
            {isFavorite(quote) ? "הוסר ממועדפים" : "הוסף למועדפים"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>חיזוק יומי</Text>
      </View>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[
            styles.toggleButton, 
            !showFavorites && styles.activeToggle
          ]}
          onPress={() => setShowFavorites(false)}
        >
          <Text style={[
            styles.toggleButtonText, 
            !showFavorites && styles.activeToggleText
          ]}>
            חיזוק יומי
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.toggleButton, 
            showFavorites && styles.activeToggle
          ]}
          onPress={() => setShowFavorites(true)}
        >
          <Text style={[
            styles.toggleButtonText, 
            showFavorites && styles.activeToggleText
          ]}>
            מועדפים ({favorites.length})
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {showFavorites ? (
          favorites.length > 0 ? (
            favorites.map(quote => renderQuoteCard(quote))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyStateText}>
                אין לך עדיין חיזוקים מועדפים.
                הוסף חיזוקים למועדפים ע"י לחיצה על סמל הלב.
              </Text>
            </View>
          )
        ) : (
          renderQuoteCard(dailyQuote)
        )}
        
        {!showFavorites && (
          <TouchableOpacity style={styles.newQuoteButton}>
            <Ionicons name="refresh" size={20} color={COLORS.background} />
            <Text style={styles.newQuoteButtonText}>
              חיזוק אחר
            </Text>
          </TouchableOpacity>
        )}
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
  toggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.regular,
    marginBottom: SPACING.medium,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: SPACING.small,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.border,
  },
  activeToggle: {
    borderBottomColor: COLORS.primary,
  },
  toggleButtonText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
  },
  activeToggleText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content: {
    padding: SPACING.regular,
  },
  quoteCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: SPACING.large,
    marginBottom: SPACING.large,
  },
  quoteText: {
    fontSize: FONT_SIZES.large,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: SPACING.medium,
    lineHeight: 28,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.small,
  },
  favoriteButtonText: {
    marginLeft: SPACING.small,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
  },
  newQuoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.medium,
    marginBottom: SPACING.large,
  },
  newQuoteButtonText: {
    marginLeft: SPACING.small,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.large,
    marginTop: SPACING.xlarge,
  },
  emptyStateText: {
    marginTop: SPACING.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ReinforcementScreen;