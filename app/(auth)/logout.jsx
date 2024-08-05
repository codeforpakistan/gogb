import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon you want to use
import { useRouter } from 'expo-router';

export default function LogoutScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login'); // Redirect to login screen after logout
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user ? `Hello, ${user.id}` : 'Hello, Guest'}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#DC3545', // Red color for logout button
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
});
