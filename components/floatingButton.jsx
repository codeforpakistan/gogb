// components/FloatingButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TabBarIcon } from './navigation/TabBarIcon';

const FloatingButton = ({ onPress, iconName = "add", color = "#fff", backgroundColor = "#4CAF50" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <TabBarIcon name={iconName} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default FloatingButton;
