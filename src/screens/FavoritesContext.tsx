import React, { createContext, useState, useContext, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho món ăn yêu thích
type FavoriteMeal = {
  id: string;
  name: string;
};

// Tạo Context cho yêu thích
type FavoritesContextType = {
  favoriteMeals: FavoriteMeal[];
  addFavorite: (meal: FavoriteMeal) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

type FavoritesProviderProps = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteMeals, setFavoriteMeals] = useState<FavoriteMeal[]>([]);

  const addFavorite = (meal: FavoriteMeal) => {
    setFavoriteMeals(prevFavorites => [...prevFavorites, meal]);
  };

  const removeFavorite = (mealId: string) => {
    setFavoriteMeals(prevFavorites => prevFavorites.filter(meal => meal.id !== mealId));
  };

  const isFavorite = (mealId: string) => {
    return favoriteMeals.some(meal => meal.id === mealId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteMeals, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
