import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ArticleScreen from '../screens/ArticleScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'News Categories' }} 
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen} 
        options={({ route }) => ({ title: route.params.categoryName })} 
      />
      <Stack.Screen 
        name="Article" 
        component={ArticleScreen} 
        options={{ title: 'Article' }} 
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search News' }} />
      <Stack.Screen name="Article" component={ArticleScreen} options={{ title: 'Article' }} />
    </Stack.Navigator>
  );
};

const BookmarksStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C3E50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'Saved Articles' }} />
      <Stack.Screen name="Article" component={ArticleScreen} options={{ title: 'Article' }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'NewsStack') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'SearchStack') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'BookmarksStack') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2C3E50',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="NewsStack" component={NewsStack} options={{ title: 'News' }} />
        <Tab.Screen name="SearchStack" component={SearchStack} options={{ title: 'Search' }} />
        <Tab.Screen name="BookmarksStack" component={BookmarksStack} options={{ title: 'Bookmarks' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;