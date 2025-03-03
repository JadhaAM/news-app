import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Linking, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { saveArticle, removeArticle } from '../redux/slices/bookmarksSlice';

const ArticleScreen = ({ route }) => {
  const { article } = route.params;
  const dispatch = useDispatch();
  const savedArticles = useSelector(state => state.bookmarks.savedArticles);
  const isSaved = savedArticles.some(savedArticle => savedArticle.url === article.url);
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const toggleBookmark = () => {
    if (isSaved) {
      dispatch(removeArticle(article));
    } else {
      dispatch(saveArticle(article));
    }
  };
  const openArticleUrl = () => {
    if (article.url) {
      Linking.openURL(article.url).catch(err => 
        console.error('Error opening article URL:', err)
      );
    }
  };
  const shareArticle = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n${article.url}`,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  const imageSource = article.urlToImage 
    ? { uri: article.urlToImage } 
    : require('../../assets/placeholder.png');
  
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.source}>
            {article.source?.name || 'Unknown source'}
          </Text>
          <Text style={styles.date}>
            {formatDate(article.publishedAt)}
          </Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={toggleBookmark}
          >
            <Ionicons 
              name={isSaved ? 'bookmark' : 'bookmark-outline'} 
              size={22} 
              color={isSaved ? '#e74c3c' : '#7f8c8d'} 
            />
            <Text style={styles.actionText}>
              {isSaved ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={shareArticle}
          >
            <Ionicons name="share-outline" size={22} color="#7f8c8d" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={openArticleUrl}
          >
            <Ionicons name="open-outline" size={22} color="#7f8c8d" />
            <Text style={styles.actionText}>Open</Text>
          </TouchableOpacity>
        </View>
        
        {article.description && (
          <Text style={styles.description}>
            {article.description}
          </Text>
        )}
        
        {article.content && (
          <Text style={styles.content}>
            {article.content.split('[+')[0]}
          </Text>
        )}
        
        <TouchableOpacity 
          style={styles.readMoreButton} 
          onPress={openArticleUrl}
        >
          <Text style={styles.readMoreText}>
            Read Full Article
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    lineHeight: 30,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  source: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    color: '#95a5a6',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
    paddingVertical: 12,
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 5,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 15,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495e',
    marginBottom: 20,
  },
  readMoreButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ArticleScreen;
