// app/(auth)/forgotPassword.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handlePasswordReset = () => {
    // Handle the password reset logic here (e.g., API call)
    alert('Password reset link has been sent to your email!');
    // Optionally, navigate back to login
    router.push('/(auth)'); // Navigate back to the login screen
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
        Reset Your Password
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" delay={200} style={styles.subtitle}>
        Enter your email address and we'll send you a link to reset your password.
      </Animatable.Text>
      <Animatable.View animation="fadeInUp" delay={400} style={styles.formContainer}>
        <Animatable.View animation="fadeInLeft" delay={300}>
          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Animatable.View>
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.buttonText}>
            Send Reset Link
          </Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)')}>
          <Text style={styles.backToLogin}>Back to Login</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
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
  backToLogin: {
    color: '#003366',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
