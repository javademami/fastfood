import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // وارد کردن Ionicons

// آدرس فایل‌های لوگو و عکس پروفایل
const logo = require('./assets/logo.png'); // مسیر لوگو
const profileImage = require('./assets/profile.png'); // مسیر عکس پروفایل

const TopBar = ({ orderCount }) => { // اضافه کردن props برای تعداد آیتم‌های سفارش
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.profileContainer}>
                {orderCount > 0 && ( // نمایش آیکن سبد خرید فقط اگر تعداد آیتم‌ها بیشتر از 0 باشد
                    <TouchableOpacity onPress={() => navigation.navigate('Order')} style={styles.cartButton}>
                        <Ionicons name="cart-outline" size={24} color="black" /> 
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{orderCount}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={profileImage} style={styles.profileImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#fff',
        elevation: 4, // برای سایه
        marginTop: 20, // فاصله از بالا
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 150, // افزایش اندازه لوگو
        height: 60, // افزایش اندازه لوگو
        resizeMode: 'contain',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20, // برای گرد کردن عکس پروفایل
        marginLeft: 10, // فاصله بین آیکن سبد خرید و عکس پروفایل
    },
    cartButton: {
        position: 'relative', // برای قرار دادن Badge در موقعیت درست
        marginRight: 10, // فاصله بین آیکن سبد خرید و عکس پروفایل
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 50,
        paddingHorizontal: 5, // padding برای Badge
        paddingVertical: 3, // padding برای Badge
        position: 'absolute',
        right: -10, // موقعیت Badge
        top: -5, // موقعیت Badge
    },
    badgeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10, // اندازه متن Badge
    },
});

export default TopBar;