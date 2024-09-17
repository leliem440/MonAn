import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../../src/screens/CategoriesScreen';
import MealsOverviewScreen from '../../src/screens/MealsOverviewScreen';
import MealDetailScreen from '../../src/screens/MealDetailScreen';
import FavoritesScreen from '../../src/screens/FavoritesScreen';
import SettingsScreen from '../../src/screens/SettingsScreen';

// Tạo các Stack và Drawer Navigator
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function MealsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
  );
}

// Điều hướng Drawer
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Meals">
      <Drawer.Screen 
        name="Meals" 
        component={MealsNavigator} 
        options={{ drawerLabel: 'Các món ăn' }}
      />
      <Drawer.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ drawerLabel: 'Yêu thích' }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ drawerLabel: 'Cài đặt' }}
      />
    </Drawer.Navigator>
  );
}

// Điều hướng Tab
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'tomato', tabBarInactiveTintColor: 'gray' }}>
      <Tab.Screen 
        name="Meals" 
        component={MealsNavigator}
        options={{
          tabBarLabel: 'Món ăn',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Yêu thích',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return <DrawerNavigator />;
}
