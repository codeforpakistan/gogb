import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import useHeaderTitle from '@/hooks/useHeaderTitle';
import Activities from './activities';
import FloatingButton from '../../../components/floatingButton';

const LawNOrder = () => {
  useHeaderTitle();
  const router = useRouter(); 

  const handlePress = () => {
    router.push({
      pathname: '/forms/lawOrder/lawForm',
      params:  { title: 'Law Form'},
    }); 
  };

  return (
    <View style={styles.container}>
      <Activities />
      <FloatingButton onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default LawNOrder;
