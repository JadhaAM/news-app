import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const getCategoryIcon = (category) => {
  const icons = {
    business: { component: MaterialIcons, name: "business", color: "#0077b6" },
    entertainment: { component: Ionicons, name: "film", color: "#bc6c25" },
    general: { component: Ionicons, name: "newspaper", color: "#6c757d" },
    health: { component: FontAwesome5, name: "heartbeat", color: "#d00000" },
    science: { component: Ionicons, name: "flask", color: "#7209b7" },
    sports: { component: Ionicons, name: "basketball", color: "#2a9d8f" },
    technology: { component: MaterialIcons, name: "computer", color: "#023e8a" }
  };
  
  return icons[category] || icons.general;
};

const CategoryCard = ({ category, onPress }) => {
  const iconData = getCategoryIcon(category.id);
  const IconComponent = iconData.component;
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <IconComponent name={iconData.name} size={40} color={iconData.color} />
        <Text style={styles.categoryTitle}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#f8f9fa',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
});

export default CategoryCard;