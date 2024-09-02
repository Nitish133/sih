// app/(auth)/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Handle login logic here (e.g., API call)
    alert('Logged in successfully!');
    router.push('/home'); // Navigate to the home screen after login
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="zoomIn"
        source={{ uri: 'https://play-lh.googleusercontent.com/TaTLTfMmizPjOn2HODyhonkGdKyzsjGWJnVbg3SPbsZLBLP28ypzTVYXkd-mMWZroA=w480-h960-rw' }} // Replace with the official government logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Government Secure Login
      </Animatable.Text>
      <Animatable.View animation="fadeInUp" delay={200} style={styles.formContainer}>
        <Animatable.View animation="fadeInLeft" delay={300}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={500}>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
          />
        </Animatable.View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            style={styles.buttonText}
          >
            Login
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/forgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#003366',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  button: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#003366',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default LoginPage;
