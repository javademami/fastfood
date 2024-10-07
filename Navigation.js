import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/Home';
import MenuScreen from './app/Menu';
import OrderScreen from './app/Order';
import ProfileScreen from './app/Profile';
import { Ionicons } from '@expo/vector-icons';
import TopBar from './TopBar'; // وارد کردن کامپوننت TopBar

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={Home} 
                options={{ header: () => <TopBar orderCount={0} /> }} // ارسال مقدار 0 به عنوان تعداد آیتم‌ها
            />
        </Stack.Navigator>
    );
};

const MenuStack = ({ addToOrder }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MenuScreen" 
                children={(props) => <MenuScreen {...props} addToOrder={addToOrder} />} 
                options={{ header: () => <TopBar orderCount={0} /> }} // ارسال مقدار 0 به عنوان تعداد آیتم‌ها
            />
        </Stack.Navigator>
    );
};

const OrderStack = ({ orderItems, setOrderItems }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="OrderScreen" 
                children={(props) => <OrderScreen {...props} orderItems={orderItems} setOrderItems={setOrderItems} />} 
                options={{ header: () => <TopBar orderCount={orderItems.length} /> }} // ارسال تعداد آیتم‌ها
            />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ProfileScreen" 
                component={ProfileScreen} 
                options={{ header: () => <TopBar orderCount={0} /> }} // ارسال مقدار 0 به عنوان تعداد آیتم‌ها
            />
        </Stack.Navigator>
    );
};

const Navigation = ({ addToOrder, orderItems, setOrderItems }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen 
                    name="Home" 
                    component={HomeStack} 
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="home-outline" size={size} color="red" />
                        ),
                    }} 
                />
                <Tab.Screen 
                    name="Menu" 
                    children={(props) => <MenuStack {...props} addToOrder={addToOrder} />} 
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="restaurant-outline" size={size} color="red" />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Order" 
                    children={(props) => <OrderStack {...props} orderItems={orderItems} setOrderItems={setOrderItems} />} 
                    options={{
                        tabBarIcon: ({ size }) => (
                            <Ionicons name="cart-outline" size={size} color="red" />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileStack} 
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