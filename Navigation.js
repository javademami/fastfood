import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/Home';
import MenuScreen from './app/Menu';
import OrderScreen from './app/Order';
import ProfileScreen from './app/Profile'; // فرض بر این است که ProfileScreen دارید
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Navigation = ({ addToOrder, orderItems, setOrderItems }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="home-outline" size={size} color="red" />
                        ),
                    }} 
                />
                <Tab.Screen 
                    name="Menu" 
                    children={(props) => <MenuScreen {...props} addToOrder={addToOrder} />} 
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="restaurant-outline" size={size} color="red" />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Order" 
                    children={(props) => <OrderScreen {...props} orderItems={orderItems} setOrderItems={setOrderItems} />} 
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="cart-outline" size={size} color="red" />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} // فرض بر این است که ProfileScreen دارید
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="person-outline" size={size} color="red" />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;