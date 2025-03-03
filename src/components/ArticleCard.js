
import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { saveArticle, removeArticle } from '../redux/slices/bookmarksSlice';

const ArticleCard = ({ article, onPress }) => {
  const dispatch = useDispatch();
  const savedArticles = useSelector(state => state.bookmarks.savedArticles);
  const isSaved = savedArticles.some(savedArticle => savedArticle.url === article.url);
  
  const toggleBookmark = () => {
    if (isSaved) {
      dispatch(removeArticle(article));
    } else {
      dispatch(saveArticle(article));
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const imageSource = article.urlToImage 
    ? { uri: article.urlToImage } 
    : require('../../assets/placeholder.png');
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {article.description || 'No description available'}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.source}>
            {article.source?.name || 'Unknown source'} • {formatDate(article.publishedAt)}
          </Text>
          <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkButton}>
            <Ionicons 
              name={isSaved ? 'bookmark' : 'bookmark-outline'} 
              size={24} 
              color={isSaved ? '#e74c3c' : '#7f8c8d'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  source: {
    fontSize: 12,
    color: '#95a5a6',
    flex: 1,
  },
  bookmarkButton: {
    padding: 5,
  },
});

export default ArticleCard;