import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Home03Icon,SpoonAndKnifeIcon,AnalyticsUpIcon,UserStatusIcon } from '@hugeicons/core-free-icons';
import Colors from './../../shared/Colors';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor:Colors.PRIMARY,headerShown:false}}>
  <Tabs.Screen name="Home" options={{ title: "Home", headerShown: false, tabBarIcon:({color,size})=> <HugeiconsIcon
      icon={Home03Icon}
      size={size}
      color={color}
      strokeWidth={1.5}
    /> }} />
  <Tabs.Screen name="Meals" options={{ title: "Meals", headerShown: false,tabBarIcon:({color,size})=> <HugeiconsIcon
      icon={SpoonAndKnifeIcon}
      size={size}
      color={color}
      strokeWidth={1.5}
    />}} />
  <Tabs.Screen name="Progress" options={{ title: "Progress", headerShown: false ,tabBarIcon:({color,size})=> <HugeiconsIcon
      icon={AnalyticsUpIcon}
      size={size}
      color={color}
      strokeWidth={1.5}
    />}} />
  <Tabs.Screen name="Profile" options={{ title: "Profile", headerShown: false ,tabBarIcon:({color,size})=> <HugeiconsIcon
      icon={UserStatusIcon}
      size={size}
      color={color}
      strokeWidth={1.5}
    />}} />
</Tabs>

  );
}