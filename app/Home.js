import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Burgers', icon: '🍔' },
  { id: '2', name: 'Pizzas', icon: '🍕' },
  { id: '3', name: 'Salads', icon: '🥗' },
  { id: '4', name: 'Drinks', icon: '🥤' },
  { id: '5', name: 'Desserts', icon: '🍰' },
];

const popularItems = [
  { id: '1', name: 'Cheeseburger', price: '9.99' },
  { id: '2', name: 'Pepperoni Pizza', price: '12.99' },
  { id: '3', name: 'Caesar Salad', price: '8.99' },
  { id: '4', name: 'Chocolate Shake', price: '4.99' },
];

const CategoryButton = ({ icon }) => (
  <TouchableOpacity style={styles.categoryButton}>
    <Text style={styles.categoryIcon}>{icon}</Text>
  </TouchableOpacity>
);

const PopularItem = ({ name, price }) => (
  <View style={styles.popularItem}>
    <View style={styles.popularItemImage} />
    <Text style={styles.popularItemName}>{name}</Text>
    <Text style={styles.popularItemPrice}>${price}</Text>
  </View>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.heading}>What would you like to eat?</Text>

        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryButton icon={item.icon} />}
          keyExtractor={(item) => item.id}
          horizontal // اضافه کردن این خط
          showsHorizontalScrollIndicator={false} // اضافه کردن این خط
          contentContainerStyle={styles.categoryList} // اضافه کردن این خط
        />

        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularHeading}>Popular Items</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularItems.map((item) => (
              <PopularItem key={item.id} name={item.name} price={item.price} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    width: 70,
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryIcon: {
    fontSize: 32,
  },
  popularSection: {
    marginTop: 16,
  },
  popularHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  popularHeading: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllButton: {
    color: '#007AFF',
    fontSize: 14,
  },
  popularItem: {
    width: 120,
    marginLeft: 16,
  },
  popularItemImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  popularItemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  popularItemPrice: {
    fontSize: 14,
    color: '#666',
  },
});
