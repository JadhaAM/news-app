
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ArticleCard from '../components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';

const BookmarksScreen = ({ navigation }) => {
  const { savedArticles } = useSelector(state => state.bookmarks);
  
  const handleArticlePress = (article) => {
    navigation.navigate('Article', { article });
  };
  
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bookmark-outline" size={80} color="#bdc3c7" />
      <Text style={styles.emptyTitle}>No Saved Articles</Text>
      <Text style={styles.emptyMessage}>
        Articles you save will appear here for easy access.
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {savedArticles.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={savedArticles}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          renderItem={({ item }) => (
            <ArticleCard 
              article={item} 
              onPress={() => handleArticlePress(item)} 
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default BookmarksScreen;