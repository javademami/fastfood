import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

const categories = [
  { id: '1', name: 'Burgers', icon: '🍔' },
  { id: '2', name: 'Pizzas', icon: '🍕' },
  { id: '3', name: 'Salads', icon: '🥗' },
  { id: '4', name: 'Drinks', icon: '🥤' },
  { id: '5', name: 'Desserts', icon: '🍰' },
];

const popularItems = [
  { id: '1', name: 'Cheeseburger', price: '9.99', image: require('./../assets/burger.jpg') },
  { id: '2', name: 'Pepperoni Pizza', price: '12.99', image: require('./../assets/pizza.jpg') },
  { id: '3', name: 'Caesar Salad', price: '8.99', image: require('./../assets/salad.jpg') },
  { id: '4', name: 'Chocolate Shake', price: '4.99', image: require('./../assets/drink.jpg') },
];

const Banner = () => {
  const [timeLeft, setTimeLeft] = useState(10800);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeLeft);

  return (
    <View style={styles.bannerContainer}>
      <Image source={require('./../assets/banner.jpg')} style={styles.bannerImage} />
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>Hot Deal</Text>
        <Text style={styles.bannerSubtitle}>Full box only $17</Text>
        <View style={styles.countdownContainer}>
          <View style={styles.countdownBox}>
            <Text style={styles.countdownNumber}>{hours}</Text>
            <Text style={styles.countdownLabel}>HOURS</Text>
          </View>
          <View style={styles.countdownBox}>
            <Text style={styles.countdownNumber}>{minutes}</Text>
            <Text style={styles.countdownLabel}>MINUTES</Text>
          </View>
          <View style={styles.countdownBox}>
            <Text style={styles.countdownNumber}>{secs}</Text>
            <Text style={styles.countdownLabel}>SECONDS</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategoryButton = ({ icon }) => (
  <TouchableOpacity style={styles.categoryButton}>
    <Text style={styles.categoryIcon}>{icon}</Text>
  </TouchableOpacity>
);

const PopularItem = ({ name, price, image, onAddToOrder }) => (
  <View style={styles.popularItem}>
    <TouchableOpacity onPress={onAddToOrder}>
      <Image source={image} style={styles.popularItemImage} />
    </TouchableOpacity>
    <Text style={styles.popularItemName}>{name}</Text>
    <Text style={styles.popularItemPrice}>${price}</Text>
  </View>
);

const BannerItem = ({ imageSource, line1, line2, line3 }) => (
  <View style={styles.bannerItem}>
    <Image source={imageSource} style={styles.bannerImageItem} />
    <View style={styles.bannerTextContainer}>
      <Text style={styles.bannerTextLine1}>{line1}</Text>
      <Text style={styles.bannerTextLine2}>{line2}</Text>
      <Text style={styles.bannerTextLine3}>{line3}</Text>
    </View>
  </View>
);

export default function HomeScreen() {
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (item) => {
    setOrderItems((prevItems) => [...prevItems, item]);
    console.log(`Added to order: ${item.name}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Banner />
        <Text style={styles.heading}>What would you like to eat?</Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryButton icon={item.icon} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
        <View style={styles.space}></View>
        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularHeading}>Popular Items</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularItems.map((item) => (
              <PopularItem
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                onAddToOrder={() => addToOrder(item)}
              />
            ))}
          </ScrollView>
          <View style={styles.space}></View>
          <View style={styles.popularHeader}>
          <Text style={styles.popularHeading}>Weekly offers</Text>
          </View>
          <View style={styles.bannersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/* Banner 1: Pizza */}
              <BannerItem
                imageSource={require('./../assets/slice.jpg')}
                line1="All pizzas"
                line2="50% Off"
                line3="Cupon code: X67RZ"
              />

              {/* Banner 2: Dessert */}
              <BannerItem
                imageSource={require('./../assets/tart.jpg')}
                line1="Yummy Dessert"
                line2="only this week"
                line3="Cupon code: UA982"
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.space}></View>
      </ScrollView>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  bannerContent: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#fff',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerSubtitle: {
    fontSize: 18,
    color: '#fff',
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  countdownBox: {
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  countdownNumber: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  countdownLabel: {
    color: '#fff',
    fontSize: 8,
  },
  buyButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 10,
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
    alignItems: 'center',
  },
  popularItemImage: {
    width: 120,
    height: 120,
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
  bannersContainer: {
    marginTop: 16,
  },
  bannerItem: {
    width: 200,
    height: 100,
    marginLeft: 16,
    borderRadius: 8,
  },
  bannerImageItem: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bannerItem: {
    width: 300,
    height: 150,
    marginLeft: 16,
    borderRadius: 8,
    position: 'relative',
  },
  bannerImageItem: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bannerTextContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  bannerTextLine1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  bannerTextLine2: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 4,
  },
  bannerTextLine3: {
    fontSize: 16,
    color: '#fff',
  },
space:{
    height:20,
},



});
