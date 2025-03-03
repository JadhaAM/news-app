
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchNewsThunk, setSearchQuery, resetNews } from '../redux/slices/newsSlice';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorView from '../components/ErrorView';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { 
    searchResults, 
    searchQuery, 
    loading, 
    error, 
    page, 
    hasMore 
  } = useSelector(state => state.news);
  
  const [localQuery, setLocalQuery] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearchChange = (text) => {
    setLocalQuery(text);
  
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (text.trim()) {
        dispatch(resetNews());
        dispatch(setSearchQuery(text));
        performSearch(text);
      }
    }, 500); 
    
    setTypingTimeout(timeout);
  };
  
  const performSearch = (query) => {
    if (!query.trim()) return;
    
    dispatch(searchNewsThunk({ 
      query, 
      page: 1, 
      pageSize: 20 
    }));
  };
  
  const handleLoadMore = () => {
    if (!loading && hasMore && searchQuery) {
      dispatch(searchNewsThunk({ 
        query: searchQuery, 
        page, 
        pageSize: 20 
      }));
    }
  };

  const handleArticlePress = (article) => {
    navigation.navigate('Article', { article });
  };
  
  useEffect(() => {
    return () => {
      dispatch(resetNews());
    };
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#95a5a6" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          value={localQuery}
          onChangeText={handleSearchChange}
          returnKeyType="search"
          onSubmitEditing={() => performSearch(localQuery)}
        />
        {localQuery ? (
          <Ionicons 
            name="close-circle" 
            size={20} 
            color="#95a5a6" 
            style={styles.clearIcon}
            onPress={() => {
              setLocalQuery('');
              dispatch(resetNews());
            }} 
          />
        ) : null}
      </View>
      
      {loading && searchResults.length === 0 ? (
        <LoadingIndicator />
      ) : error ? (
        <ErrorView 
          message={error} 
          onRetry={() => performSearch(searchQuery)} 
        />
      ) : (
        <FlatList
          data={searchResults}
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
          ListFooterComponent={() => (
            loading && searchResults.length > 0 ? <LoadingIndicator size="small" /> : null
          )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2c3e50',
  },
  clearIcon: {
    padding: 5,
  },
  listContainer: {
    padding: 10,
  },
});

export default SearchScreen;
