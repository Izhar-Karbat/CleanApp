// App.tsx

import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/Home/HomeScreen';
import JournalScreen from './src/screens/Journal/JournalScreen';
import ReinforcementScreen from './src/screens/Reinforcement/ReinforcementScreen';
import MeditationScreen from './src/screens/Meditation/MeditationScreen';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import SOSScreen from './src/screens/SOS/SOSScreen';

// Import theme
import { COLORS } from './src/utils/theme';

// Enable RTL for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom tab navigator
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
          tabBarLabel: 'בית',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarLabel: 'יומן',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="journal" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reinforcement"
        component={ReinforcementScreen}
        options={{
          tabBarLabel: 'חיזוק',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{
          tabBarLabel: 'מדיטציה',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'הגדרות',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  // Force RTL
  useEffect(() => {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen 
          name="SOS" 
          component={SOSScreen} 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'SOS - רגע של קושי',
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}