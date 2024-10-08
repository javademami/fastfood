import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserProfile = ({ user = {}, onLogout }) => {
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  
  // تاریخچه سفارشات با مجموع قیمت‌ها
  const [orderHistory, setOrderHistory] = useState(user.orderHistory || [
    { date: '2024-01-01', items: ['Pepperoni Pizza', 'Margherita Pizza'], total: 38 },
    { date: '2024-02-15', items: ['Cheeseburger'], total: 15 },
    { date: '2024-03-20', items: ['Greek Salad', 'Spaghetti', 'Tiramisu'], total: 36 },
  ]);

  const chooseProfileImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveChanges = () => {
    Alert.alert('Changes saved!', 'Your profile information has been updated.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* قسمت پروفایل */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={chooseProfileImage}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.greetingText}>Hi!</Text>
        <Text style={styles.userName}>Javad</Text>
      </View>

      {/* دکمه انتخاب عکس پروفایل */}
      <TouchableOpacity style={styles.chooseImageButton} onPress={chooseProfileImage}>
        <Text style={styles.chooseImageText}>Choose Profile Image</Text>
      </TouchableOpacity>

      {/* اطلاعات کاربر */}
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.infoLabel}>Phone:</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

        <Text style={styles.infoLabel}>Address:</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} />
        
        <Text style={styles.infoLabel}>City:</Text> 
        <TextInput style={styles.input} value={city} onChangeText={setCity} />

        <Text style={styles.infoLabel}>Postal Code:</Text> 
        <TextInput style={styles.input} value={postalCode} onChangeText={setPostalCode} />
      </View>

      {/* تاریخچه سفارشات */}
      <View style={styles.orderHistorySection}>
        <Text style={styles.orderHistoryTitle}>Order History</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>Items</Text>
          <Text style={styles.tableHeaderText}>Total</Text>
        </View>
        {orderHistory.length > 0 ? (
          orderHistory.map((order, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderText}>{order.date}</Text>
              <Text style={styles.orderText}>{order.items.join(', ')}</Text>
              <Text style={styles.orderText}>${order.total}</Text>
            </View>
          ))
        ) : (
          <Text>No orders found.</Text>
        )}
      </View>

      {/* دکمه ذخیره تغییرات */}
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      {/* دکمه خروج */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ marginBottom: 20 }} /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  chooseImageButton: {
    backgroundColor: '#dcdcdc',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  chooseImageText: {
    color: '#000',
    fontSize: 16,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  orderHistorySection: {
    marginBottom: 20,
  },
  orderHistoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderText: {
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfile;
