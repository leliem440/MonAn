import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { MEALS, CATEGORIES } from '../data/meals';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MealsOverview: { categoryId: string };
  MealDetail: { mealId: string };
};

type MealsOverviewScreenRouteProp = RouteProp<RootStackParamList, 'MealsOverview'>;
type MealsOverviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MealsOverview'>;

type Meal = {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
};

const MealsOverviewScreen = () => {
  const route = useRoute<MealsOverviewScreenRouteProp>();
  const navigation = useNavigation<MealsOverviewScreenNavigationProp>();
  const { categoryId } = route.params;

  const displayedMeals = MEALS.filter(meal => meal.categoryId === categoryId);

  React.useEffect(() => {
    const categoryTitle = CATEGORIES.find(category => category.id === categoryId)?.name;
    navigation.setOptions({ title: categoryTitle });
  }, [categoryId, navigation]);

  const renderMealItem = ({ item }: { item: Meal }) => (
    <Pressable onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}>
      <View style={styles.mealItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.mealImage} />
        <Text style={styles.mealName}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={displayedMeals}
      renderItem={renderMealItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  mealImage: {
    width: '100%',
    height: 200,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
});

export default MealsOverviewScreen;
