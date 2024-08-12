import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useRouter } from 'expo-router';
import pb from '../../pocketbaseClient';
import useHeaderTitle from '../../hooks/useHeaderTitle';

export default function LogoutScreen() {
  useHeaderTitle('Govt. of Gilgit Baltistan');
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const handleLogout = () => {
    pb.authStore.clear();
    dispatch(logout());
    router.replace('/login'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
      <Text style={styles.username}>{user ? user.record.name : 'Guest'}</Text>
      </View>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    justifyContent: 'flex-start',
  },
  userDetails: {
    marginBottom: 20, 
    gap:20
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 50
  },
  logoutButton: {
    backgroundColor: '#1DA1F2', 
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
