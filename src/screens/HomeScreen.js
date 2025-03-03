
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCategory, resetNews } from '../redux/slices/newsSlice';
import CategoryCard from '../components/CategoryCard';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const categories = [
    { id: 'general', name: 'Top Headlines' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'sports', name: 'Sports' },
    { id: 'science', name: 'Science' },
    { id: 'health', name: 'Health' },
  ];
  
  const handleCategoryPress = (category) => {
    dispatch(resetNews());
    dispatch(setCategory(category.id));
    navigation.navigate('Category', { 
      categoryId: category.id,
      categoryName: category.name
    });
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard 
            category={item} 
            onPress={() => handleCategoryPress(item)} 
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;