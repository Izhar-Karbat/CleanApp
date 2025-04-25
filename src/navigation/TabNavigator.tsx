// src/navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens (we'll create these next)
import HomeScreen from '../screens/Home/HomeScreen';
import JournalScreen from '../screens/Journal/JournalScreen';
import ReinforcementScreen from '../screens/Reinforcement/ReinforcementScreen';
import MeditationScreen from '../screens/Meditation/MeditationScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

// Import theme
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();

// Hebrew tab names
const tabNames = {
  home: 'בית',
  journal: 'יומן',
  reinforcement: 'חיזוק',
  meditation: 'מדיטציה',
  settings: 'הגדרות'
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: tabNames.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarLabel: tabNames.journal,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="journal" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reinforcement"
        component={ReinforcementScreen}
        options={{
          tabBarLabel: tabNames.reinforcement,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{
          tabBarLabel: tabNames.meditation,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: tabNames.settings,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;