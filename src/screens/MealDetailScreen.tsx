import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { MEALS } from '../data/meals';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

// Định nghĩa kiểu cho params của route
type RootStackParamList = {
  MealDetail: { mealId: string };
};

type MealDetailScreenRouteProp = RouteProp<RootStackParamList, 'MealDetail'>;

type Meal = {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  ingredients: string[];
  steps: string[];
};

const MealDetailScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const route = useRoute<MealDetailScreenRouteProp>();
  const { mealId } = route.params;
  const navigation = useNavigation();

  const selectedMeal = MEALS.find(meal => meal.id === mealId) as Meal | undefined;

  if (!selectedMeal) {
    return <Text>Không tìm thấy món ăn.</Text>;
  }

  // Thay đổi tiêu đề màn hình thành tên món ăn và nút Yêu thích
  useEffect(() => {
    navigation.setOptions({
      title: selectedMeal.name,
      headerRight: () => (
        <Button
          onPress={toggleFavoriteStatus}
          title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
          color={isFavorite ? "red" : "#ff6347"}
        />
      ),
    });
  }, [selectedMeal, navigation, isFavorite]);

  // Hàm để thay đổi trạng thái yêu thích
  const toggleFavoriteStatus = () => {
    setIsFavorite(prevState => !prevState);
  };


};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 8,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
  listItem: {
    marginHorizontal: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
  },
});

export default MealDetailScreen;
