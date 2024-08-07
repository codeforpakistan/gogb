import React from 'react';
import { Text, FlatList, Image, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

// Define the path to the icons relative to this file
const data = [
  { id: '1', name: 'Law & Order', icon: require('../../assets/images/order.png'), link: '/forms/lawOrder/lawNOrder' },
  { id: '2', name: 'Price Control', icon: require('../../assets/images/price.png'), link: '/forms/priceControl/price' },
  // Add more items as needed
];

const Index = () => {
  const renderItem = ({ item }) => (
    <Link href={`${item.link}`} style={styles.itemContainer}>
      <View style={styles.innerContainer}>
        <Image source={item.icon} style={styles.icon} />
        <ThemedText type="subtitle" style={styles.iconName}>{item.name}</ThemedText>   
      </View>
    </Link>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  innerContainer: {
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  iconName: {

    textAlign: 'center',
    color: '#333',
  },
});

export default Index;
