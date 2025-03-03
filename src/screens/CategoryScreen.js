
import React, { useEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, resetNews } from '../redux/slices/newsSlice';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorView from '../components/ErrorView';

const CategoryScreen = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const dispatch = useDispatch();
  
  const { 
    articles, 
    loading, 
    error, 
    page, 
    hasMore 
  } = useSelector(state => state.news);
  
  useEffect(() => {
    loadNews();
  }, [categoryId]);
  const loadNews = () => {
    dispatch(fetchNews({ 
      category: categoryId, 
      page: 1, 
      pageSize: 20 
    }));
  };
  
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchNews({ 
        category: categoryId, 
        page, 
        pageSize: 20 
      }));
    }
  };
  
  const handleRefresh = () => {
    dispatch(resetNews());
    loadNews();
  };
  
  const handleArticlePress = (article) => {
    navigation.navigate('Article', { article });
  };
  
  if (loading && articles.length === 0) {
    return <LoadingIndicator />;
  }
  
  if (error && articles.length === 0) {
    return <ErrorView message={error} onRetry={loadNews} />;
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => `${item.url}-${index}`}
        renderItem={({ item }) => (
          <ArticleCard 
            article={item} 
            onPress={() => handleArticlePress(item)} 
          />
        )}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading && page === 1}
            onRefresh={handleRefresh}
            colors={['#2C3E50']}
          />
        }
        ListFooterComponent={() => (
          loading && articles.length > 0 ? <LoadingIndicator size="small" /> : null
        )}
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
    padding: 10,
  },
});

export default CategoryScreen;