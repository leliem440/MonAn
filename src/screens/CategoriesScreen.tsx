import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/meals';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Định nghĩa kiểu cho RootStackParamList
type RootStackParamList = {
  Categories: undefined;
  MealsOverview: { categoryId: string };
  // Thêm các màn hình khác nếu cần
};

const CategoriesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderCategoryItem = ({ item }: { item: (typeof CATEGORIES)[0] }) => (
    <TouchableOpacity 
      style={[styles.categoryItem, { backgroundColor: item.color }]}
      onPress={() => navigation.navigate('MealsOverview', { categoryId: item.id })}
    >
      <Text style={styles.categoryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CategoriesScreen;