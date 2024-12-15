import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: 'Évènements',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="event-note" color={color} />,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="event" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pass"
        options={{
          title: 'Pass',
          tabBarIcon: ({ color }) => <MaterialIcons name="assignment-ind" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code-scanner" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="billeterie"
        options={{
          title: 'Infos',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="announcement" color={color} />,
        }}
      />

    </Tabs>
  );
}
