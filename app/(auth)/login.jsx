import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useRouter } from 'expo-router';
import pb from '../../pocketbaseClient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const authData = await pb.collection('users').authWithPassword(id, password);
      dispatch(login(authData)); // Store user data in Redux
      console.log(authData);
      router.replace('/'); 
    } catch (err) {
      const errorMessage = err.message || 'Invalid ID or password';
      setError(errorMessage);
      try {
        Alert.alert('Error', errorMessage);
      } catch (error) {
        console.log(error)
      }
      console.error(err); // Log the error for debugging purposes
    }
  };
  

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        value={id}
        onChangeText={setId}
        placeholder="Enter your ID"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
          style={styles.passwordInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#999" />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  passwordContainer: {
    width: '90%',
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 50, // Make room for the icon
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }], // Center icon vertically
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
