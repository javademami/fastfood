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

  // فیلدهای کارت
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiredDate, setExpiredDate] = useState('');

  // ذخیره‌سازی اطلاعات کارت
  const [savedCardInfo, setSavedCardInfo] = useState(null);

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
    setSavedCardInfo({ cardNumber, cardHolderName, expiredDate });
    Alert.alert('Changes saved!', 'Your profile information and card details have been updated.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* قسمت پروفایل */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={chooseProfileImage}>
          <Image 
            source={profileImage ? { uri: profileImage } : require('./../assets/man.png')} 
            style={styles.profileImage} 
          />
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

      {/* فیلدهای کارت */}
      <View style={styles.cardSection}>
        <Text style={styles.infoLabel}>Card Number:</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Enter card number"
        />

        <Text style={styles.infoLabel}>Card Holder Name:</Text>
        <TextInput
          style={styles.input}
          value={cardHolderName}
          onChangeText={setCardHolderName}
          placeholder="Enter card holder name"
        />

        <Text style={styles.infoLabel}>Expired Date:</Text>
        <TextInput
          style={styles.input}
          value={expiredDate}
          onChangeText={setExpiredDate}
          placeholder="MM/YY"
        />
      </View>

      {/* کارت با اطلاعات ورودی */}
      {cardNumber && cardHolderName && expiredDate ? (
        <View style={styles.card}>
          <Image source={require('./../assets/Card.png')} style={styles.cardBackground} />
          <Text style={styles.cardNumber}>{cardNumber}</Text>
          <Text style={styles.cardHolder}>
            {cardHolderName} 
            
          </Text>
          <Text style={styles.expHolder}>{expiredDate}</Text>
        </View>
      ) : null}

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
    backgroundColor: '#FAF9F6',
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
    backgroundColor: '#f4f4f4',
  },
  cardSection: {
    marginBottom: 20,
    
  },
  card: {
    width:343,
    height:218,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    marginBottom:30,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: '#ccc',
    
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  cardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
   
  },
  cardHolder: {
    fontSize: 16,
    color: '#333',
    position: 'absolute',
    bottom:10,
    color: '#fff',
    left:30,
  },
  expHolder: {
    fontSize: 16,
    color: '#333',
    position: 'absolute',
    bottom:10,
    color: '#fff',
    left:170,
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
