// src/screens/Journal/JournalScreen.tsx

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  I18nManager
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONT_SIZES, SPACING } from '../../utils/theme';

// Interface for journal entry
interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'awful';
  symptoms: string[];
}

// Interface for the mood option
interface MoodOption {
  value: JournalEntry['mood'];
  label: string;
  icon: string;
  color: string;
}

// Component for the Journal Screen
const JournalScreen = () => {
  // State variables
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [entryContent, setEntryContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood']>('neutral');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // Available mood options
  const moodOptions: MoodOption[] = [
    { value: 'great', label: 'מצוין', icon: 'happy', color: '#4CAF50' },
    { value: 'good', label: 'טוב', icon: 'happy-outline', color: '#8BC34A' },
    { value: 'neutral', label: 'רגיל', icon: 'remove-outline', color: '#FFC107' },
    { value: 'bad', label: 'לא טוב', icon: 'sad-outline', color: '#FF9800' },
    { value: 'awful', label: 'נורא', icon: 'sad', color: '#F44336' },
  ];

  // Common symptoms during cannabis withdrawal
  const symptomsList = [
    'חרדה', 'דיכאון', 'בחילה', 'קשיי שינה', 
    'חוסר תיאבון', 'התקפי זעם', 'הזעה', 
    'כאבי ראש', 'עייפות', 'רצון להשתמש'
  ];

  // Load entries from AsyncStorage when component mounts
  useEffect(() => {
    loadEntries();
  }, []);

  // Load journal entries from AsyncStorage
  const loadEntries = async () => {
    try {
      const entriesData = await AsyncStorage.getItem('journalEntries');
      if (entriesData) {
        setEntries(JSON.parse(entriesData));
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
      Alert.alert('שגיאה', 'לא ניתן לטעון את יומן הרישום');
    }
  };

  // Save entries to AsyncStorage
  const saveEntries = async (updatedEntries: JournalEntry[]) => {
    try {
      await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    } catch (error) {
      console.error('Error saving journal entries:', error);
      Alert.alert('שגיאה', 'לא ניתן לשמור את הרישום ביומן');
    }
  };

  // Open the entry modal
  const openEntryModal = (entry: JournalEntry | null = null) => {
    if (entry) {
      // Editing existing entry
      setEditingEntry(entry);
      setEntryContent(entry.content);
      setSelectedMood(entry.mood);
      setSelectedSymptoms(entry.symptoms);
    } else {
      // New entry
      setEditingEntry(null);
      setEntryContent('');
      setSelectedMood('neutral');
      setSelectedSymptoms([]);
    }
    setModalVisible(true);
  };

  // Toggle a symptom selection
  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Save the current entry
  const saveEntry = () => {
    if (!entryContent.trim()) {
      Alert.alert('הודעה', 'אנא הכנס תוכן לרישום');
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    
    // Create updated entries list
    let updatedEntries: JournalEntry[];
    
    if (editingEntry) {
      // Update existing entry
      updatedEntries = entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, content: entryContent, mood: selectedMood, symptoms: selectedSymptoms } 
          : entry
      );
    } else {
      // Add new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: formattedDate,
        content: entryContent,
        mood: selectedMood,
        symptoms: selectedSymptoms
      };
      updatedEntries = [newEntry, ...entries];
    }

    // Update state and storage
    setEntries(updatedEntries);
    saveEntries(updatedEntries);
    setModalVisible(false);
  };

  // Delete an entry
  const deleteEntry = (id: string) => {
    Alert.alert(
      'אישור מחיקה',
      'האם אתה בטוח שברצונך למחוק רישום זה?',
      [
        { text: 'ביטול', style: 'cancel' },
        { 
          text: 'מחק', 
          onPress: () => {
            const updatedEntries = entries.filter(entry => entry.id !== id);
            setEntries(updatedEntries);
            saveEntries(updatedEntries);
          },
          style: 'destructive'
        }
      ]
    );
  };

  // Format date as "יום שני, 01/01/2023"
  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    // Hebrew day names
    const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const dayName = dayNames[date.getDay()];

    return `יום ${dayName}, ${dateString}`;
  };

  // Render each entry item
  const renderEntryItem = ({ item }: { item: JournalEntry }) => {
    const mood = moodOptions.find(m => m.value === item.mood);
    
    return (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View style={styles.moodContainer}>
            <Ionicons 
              name={mood?.icon || 'remove-outline'} 
              size={22} 
              color={mood?.color || COLORS.text} 
            />
            <Text style={styles.moodText}>{mood?.label}</Text>
          </View>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        </View>
        
        <Text style={styles.entryContent}>{item.content}</Text>
        
        {item.symptoms.length > 0 && (
          <View style={styles.symptomsContainer}>
            <Text style={styles.symptomsTitle}>סימפטומים:</Text>
            <View style={styles.symptomsTagsContainer}>
              {item.symptoms.map(symptom => (
                <View key={symptom} style={styles.symptomTag}>
                  <Text style={styles.symptomText}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <View style={styles.entryActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => openEntryModal(item)}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>ערוך</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteEntry(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            <Text style={[styles.actionText, styles.deleteText]}>מחק</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>היומן שלי</Text>
        <Text style={styles.headerSubtitle}>
          תיעוד הרגשות והסימפטומים שלך במהלך תהליך הניקיון
        </Text>
      </View>

      {/* Journal Entries List */}
      {entries.length > 0 ? (
        <FlatList
          data={entries}
          renderItem={renderEntryItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.entriesList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="journal-outline" size={64} color={COLORS.primary} />
          <Text style={styles.emptyStateTitle}>אין רישומים עדיין</Text>
          <Text style={styles.emptyStateText}>
            הוסף את הרישום הראשון שלך כדי לעקוב אחר התקדמותך
          </Text>
        </View>
      )}

      {/* Add Entry Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => openEntryModal()}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Entry Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {editingEntry ? 'ערוך רישום' : 'רישום חדש'}
              </Text>
            </View>

            {/* Mood Selection */}
            <Text style={styles.sectionTitle}>איך אתה מרגיש היום?</Text>
            <View style={styles.moodOptionsContainer}>
              {moodOptions.map(mood => (
                <TouchableOpacity 
                  key={mood.value} 
                  style={[
                    styles.moodOption,
                    selectedMood === mood.value && styles.selectedMoodOption
                  ]}
                  onPress={() => setSelectedMood(mood.value)}
                >
                  <Ionicons name={mood.icon} size={28} color={mood.color} />
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Journal Entry Content */}
            <Text style={styles.sectionTitle}>מה עובר עליך?</Text>
            <TextInput
              style={styles.entryInput}
              multiline={true}
              placeholder="שתף את המחשבות, ההרגשות והחוויות שלך..."
              value={entryContent}
              onChangeText={setEntryContent}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
              placeholderTextColor="#A0A0A0"
            />

            {/* Symptoms Selection */}
            <Text style={styles.sectionTitle}>סימפטומים שאתה חווה:</Text>
            <View style={styles.symptomsSelectionContainer}>
              {symptomsList.map(symptom => (
                <TouchableOpacity 
                  key={symptom} 
                  style={[
                    styles.symptomOption,
                    selectedSymptoms.includes(symptom) && styles.selectedSymptom
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    styles.symptomOptionText,
                    selectedSymptoms.includes(symptom) && styles.selectedSymptomText
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Save Button */}
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={saveEntry}
            >
              <Text style={styles.saveButtonText}>שמור</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.large,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.small,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'right',
    marginTop: SPACING.xsmall,
  },
  entriesList: {
    padding: SPACING.medium,
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodText: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    marginLeft: SPACING.xsmall,
  },
  dateText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
  },
  entryContent: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: SPACING.medium,
  },
  symptomsContainer: {
    marginTop: SPACING.small,
  },
  symptomsTitle: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textLight,
    marginBottom: SPACING.xsmall,
    textAlign: 'right',
  },
  symptomsTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  symptomTag: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginLeft: 8,
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 12,
    color: COLORS.text,
  },
  entryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: SPACING.medium,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F9F9F9',
    marginLeft: SPACING.small,
  },
  actionText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.primary,
    marginLeft: 4,
  },
  deleteButton: {
    backgroundColor: '#FFF0F0',
  },
  deleteText: {
    color: '#FF3B30',
  },
  addButton: {
    position: 'absolute',
    bottom: SPACING.large,
    right: SPACING.large,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.large,
  },
  emptyStateTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.medium,
    marginBottom: SPACING.small,
  },
  emptyStateText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SPACING.large,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  closeButton: {
    padding: SPACING.small,
  },
  modalTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'right',
    flex: 1,
    marginRight: SPACING.medium,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.small,
    textAlign: 'right',
  },
  moodOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.large,
  },
  moodOption: {
    alignItems: 'center',
    padding: SPACING.small,
    borderRadius: 8,
    width: '18%',
  },
  selectedMoodOption: {
    backgroundColor: '#F0F0F0',
  },
  moodLabel: {
    fontSize: FONT_SIZES.xsmall,
    marginTop: 4,
    textAlign: 'center',
  },
  entryInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: SPACING.medium,
    minHeight: 120,
    fontSize: FONT_SIZES.medium,
    color: COLORS.text,
    textAlignVertical: 'top',
    marginBottom: SPACING.large,
  },
  symptomsSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginBottom: SPACING.large,
  },
  symptomOption: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
    marginBottom: 8,
  },
  selectedSymptom: {
    backgroundColor: COLORS.primary,
  },
  symptomOptionText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text,
  },
  selectedSymptomText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.medium,
    alignItems: 'center',
    marginTop: SPACING.medium,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
});

export default JournalScreen;