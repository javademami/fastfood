import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // وارد کردن آیکن‌ها

const menuSections = [
  {
    title: 'Pizzas',
    data: [
      { 
        id: '1', 
        name: 'Pepperoni Pizza', 
        price: 12.99, 
        ingredients: 'Pepperoni, Mozzarella, Tomato Sauce', 
        image: require('./../assets/pizza.jpg') // آدرس تصویر پیتزا
      },
      { 
        id: '2', 
        name: 'Margherita Pizza', 
        price: 11.99, 
        ingredients: 'Tomato, Mozzarella, Basil',
        image: require('./../assets/pizza.jpg') // آدرس تصویر پیتزا
      },
      { 
        id: '3', 
        name: 'Kebab Pizza', 
        price: 13.99, 
        ingredients: 'Kebab, Onion, Tomato, Mozzarella',
        image: require('./../assets/pizza.jpg') // آدرس تصویر پیتزا
      },
    ],
  },
  {
    title: 'Burgers',
    data: [
      { 
        id: '4', 
        name: 'Cheeseburger', 
        price: 9.99, 
        ingredients: 'Beef, Cheese, Lettuce, Tomato, Pickles', 
        image: require('./../assets/burger.jpg') // آدرس تصویر همبرگر
      },
      { 
        id: '5', 
        name: 'Veggie Burger', 
        price: 8.99, 
        ingredients: 'Black Bean, Avocado, Lettuce, Tomato', 
        image: require('./../assets/burger.jpg') // آدرس تصویر همبرگر
      },
    ],
  },
  {
    title: 'Salads',
    data: [
      { 
        id: '6', 
        name: 'Caesar Salad', 
        price: 8.99, 
        ingredients: 'Romaine, Croutons, Caesar Dressing', 
        image: require('./../assets/salad.jpg') // آدرس تصویر سالاد
      },
      { 
        id: '7', 
        name: 'Greek Salad', 
        price: 7.99, 
        ingredients: 'Cucumber, Tomato, Olives, Feta', 
        image: require('./../assets/salad.jpg') // آدرس تصویر سالاد
      },
    ],
  },
  {
    title: 'Drinks',
    data: [
      { 
        id: '8', 
        name: 'Coke', 
        price: 1.99, 
        image: require('./../assets/drink.jpg') // آدرس تصویر نوشیدنی
      },
      { 
        id: '9', 
        name: 'Lemonade', 
        price: 2.49, 
        image: require('./../assets/drink.jpg') // آدرس تصویر نوشیدنی
      },
    ],
  },
  {
    title: 'Desserts',
    data: [
      { 
        id: '10', 
        name: 'Chocolate Cake', 
        price: 4.99, 
        image: require('./../assets/cake.jpg') // آدرس تصویر کیک
      },
      { 
        id: '11', 
        name: 'Ice Cream', 
        price: 3.99, 
        image: require('./../assets/cake.jpg') // آدرس تصویر کیک
      },
    ],
  },
];

const MenuItem = ({ name, price, ingredients, image, onAddToOrder }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuItemContent}>
      {image && <Image source={image} style={styles.menuItemImage} />} 
      <View style={styles.menuTextContent}>
        <Text style={styles.menuItemName}>{name}</Text>
        <Text style={styles.menuItemPrice}>${price.toFixed(2)}</Text> 
        {ingredients && <Text style={styles.menuItemIngredients}>{ingredients}</Text>}
      </View>
    </View>
    <TouchableOpacity onPress={onAddToOrder}>
      <Ionicons name="cart-outline" size={24} color="red" /> 
    </TouchableOpacity>
  </TouchableOpacity>
);

const MenuScreen = ({ addToOrder }) => {
  const handleAddToOrder = (item) => {
    addToOrder(item); // فراخوانی تابع برای افزودن به سبد خرید
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu</Text>
      <SectionList
        sections={menuSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem
            name={item.name}
            price={item.price}
            ingredients={item.ingredients}
            image={item.image} // ارسال تصویر به MenuItem
            onAddToOrder={() => handleAddToOrder(item)} // اتصال تابع به آیکن سبد خرید
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between', // برای تراز کردن آیکن و متن
    alignItems: 'center',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTextContent: {
    flexDirection: 'column',
    marginLeft: 10, // فاصله بین تصویر و متن
  },
  menuItemImage: {
    width: 60, // اندازه تصویر
    height: 60, // اندازه تصویر
    borderRadius: 5, // گرد کردن گوشه‌های تصویر
  },
  menuItemName: {
    fontSize: 18,
  },
  menuItemPrice: {
    fontSize: 18,
    color: '#666',
  },
  menuItemIngredients: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default MenuScreen;