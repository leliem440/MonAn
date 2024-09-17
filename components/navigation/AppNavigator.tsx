import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';


import { FavoritesProvider } from '../../src/screens/FavoritesContext';
import CategoriesScreen from '../../src/screens/CategoriesScreen';
import MealsOverviewScreen from '../../src/screens/MealsOverviewScreen';
import MealDetailScreen from '../../src/screens/MealDetailScreen';
import FavoritesScreen from '../../src/screens/FavoritesScreen';
import SettingsScreen from '../../src/screens/SettingsScreen'; // Thêm màn hình Cài đặt

type RootStackParamList = {
  Categories: undefined;
  MealsOverview: { categoryId: string };
  MealDetail: { mealId: string };
};

type TabParamList = {
  Meals: undefined;
  Favorites: undefined;
  Settings: undefined; // Thêm Tab Cài đặt
};

type DrawerParamList = {
  MealsCategories: undefined;
  Favorites: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Stack navigator cho các màn hình danh mục và chi tiết món ăn
function MealsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
      <Stack.Screen 
        name="MealDetail" 
        component={MealDetailScreen}
        options={({ route }) => ({
          title: route.params.mealId ? `Chi tiết món ăn` : 'Chi tiết'
        })}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator cho các màn hình Danh mục, Yêu thích và Cài đặt
function TabNavigator() {
  return (
    <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName: keyof typeof Ionicons.glyphMap | undefined;

      if (route.name === 'Meals') {
        iconName = 'fast-food-outline'; // Chọn tên biểu tượng đúng
      } else if (route.name === 'Favorites') {
        iconName = 'heart-outline'; // Chọn tên biểu tượng đúng
      } else if (route.name === 'Settings') {
        iconName = 'settings-outline'; // Chọn tên biểu tượng đúng
      }

      return iconName ? <Ionicons name={iconName} size={size} color={color} /> : null;
    },
  })}
>
  <Tab.Screen name="Meals" component={MealsNavigator} />
  <Tab.Screen name="Favorites" component={FavoritesScreen} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>

  );
}

// Drawer Navigator cho các màn hình chính
export default function AppNavigator() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="MealsCategories" component={TabNavigator} options={{ title: 'Danh mục' }} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Yêu thích' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Cài đặt' }} />
    </Drawer.Navigator>
    </NavigationContainer>
    </FavoritesProvider>
  );
}
