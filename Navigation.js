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

const HomeStack = ({ orderItems }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={Home} 
                options={{
                    header: () => <TopBar orderCount={orderItems.length} />, // نمایش TopBar و تعداد آیتم‌های سفارش
                    headerShown: true, // مخفی کردن هدر پیش‌فرض
                }} 
            />
        </Stack.Navigator>
    );
};

const MenuStack = ({ addToOrder, orderItems }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="MenuScreen" 
                children={(props) => <MenuScreen {...props} addToOrder={addToOrder} />} 
                options={{
                    header: () => <TopBar orderCount={orderItems.length} />, // نمایش TopBar و تعداد آیتم‌های سفارش
                    headerShown: true, // مخفی کردن هدر پیش‌فرض
                }} 
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
                options={{
                    header: () => <TopBar orderCount={orderItems.length} />, // نمایش TopBar و تعداد آیتم‌های سفارش
                    headerShown: true, // مخفی کردن هدر پیش‌فرض
                }} 
            />
        </Stack.Navigator>
    );
};

const ProfileStack = ({ orderItems }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ProfileScreen" 
                component={ProfileScreen} 
                options={{
                    header: () => <TopBar orderCount={orderItems.length} />, // نمایش TopBar و تعداد آیتم‌های سفارش
                    headerShown: true, // مخفی کردن هدر پیش‌فرض
                }} 
            />
        </Stack.Navigator>
    );
};

const Navigation = ({ addToOrder, orderItems, setOrderItems }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Menu') {
                            iconName = focused ? 'restaurant' : 'restaurant-outline';
                        } else if (route.name === 'Order') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={focused ? 'white' : 'red'} />;
                    },
                    tabBarActiveTintColor: 'white', // رنگ نوشته تب فعال سفید
                    tabBarInactiveTintColor: 'red', // رنگ نوشته تب غیرفعال قرمز
                    tabBarActiveBackgroundColor: 'red', // پس‌زمینه تب فعال قرمز
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        height: 60,
                    },
                    tabBarItemStyle: {
                        borderRadius: 20, // گوشه‌های گرد برای تب فعال
                        marginVertical: 5,
                        marginHorizontal: 10,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '400',
                        marginBottom: 2,
                    },
                })}
            >
                <Tab.Screen 
                    name="Home" 
                    children={(props) => <HomeStack {...props} orderItems={orderItems} />} 
                    options={{
                        headerShown: false, // مخفی کردن عنوان صفحه
                        tabBarIcon: ({ focused, size }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={focused ? "white" : "red"} />
                        ),
                    }} 
                />
                <Tab.Screen 
                    name="Menu" 
                    children={(props) => <MenuStack {...props} addToOrder={addToOrder} orderItems={orderItems} />} 
                    options={{
                        headerShown: false, // مخفی کردن عنوان صفحه
                        tabBarIcon: ({ focused, size }) => (
                            <Ionicons name={focused ? "restaurant" : "restaurant-outline"} size={size} color={focused ? "white" : "red"} />
                        ),
                    }}
                />
                <Tab.Screen 
                
                    name="Order" 
                    children={(props) => <OrderStack {...props} orderItems={orderItems} setOrderItems={setOrderItems} />} 
                    options={{
                        headerShown: false, // مخفی کردن عنوان صفحه
                        tabBarIcon: ({ focused, size }) => (
                            <Ionicons name={focused ? "cart" : "cart-outline"} size={size} color={focused ? "white" : "red"} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    children={(props) => <ProfileStack {...props} orderItems={orderItems} />} 
                    options={{
                        headerShown: false, // مخفی کردن عنوان صفحه
                        tabBarIcon: ({ focused, size }) => (
                            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={focused ? "white" : "red"} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
