import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import useHeaderTitle from '@/hooks/useHeaderTitle'
import FloatingButton from '../../../components/floatingButton';

const price = () => {
  useHeaderTitle('Price Control');
  const router = useRouter(); 

  const handlePress = () => {
    router.push({
      pathname: '/forms/priceControl/priceControlForm',
      params:  { title: 'Price Control Form'},
    }); 
  };

  return (
    <View style={styles.container}>
      <Text>price</Text>
      <FloatingButton onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default price