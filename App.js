import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Navigation from './Navigation';
import 'react-native-gesture-handler';

export default function App() {
    const [orderItems, setOrderItems] = useState([]);

    const addToOrder = (item) => {
        setOrderItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) {
                return prevItems.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Navigation addToOrder={addToOrder} orderItems={orderItems} setOrderItems={setOrderItems} /> 
        </SafeAreaView>
    );
}