// SirenScreen.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';

const SirenScreen = () => {
  const router = useRouter();
  const soundRef = useRef(null); // Reference for the sound object

  // Load and play the siren sound
  useEffect(() => {
    const loadAndPlaySiren = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/WhatsApp Audio 2024-09-01 at 15.49.20_6a8cbbc3.mp3'), // Place your siren sound file in the correct path
        { shouldPlay: true, isLooping: true }
      );
      soundRef.current = sound;
    };

    loadAndPlaySiren();

    // Cleanup function to stop and unload sound when the component is unmounted
    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Handle back button to navigate back to the main screen
  const handleBack = () => {
    if (soundRef.current) {
      soundRef.current.stopAsync();
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Flashing Red Light */}
      <Animatable.View
        animation="flash"
        iterationCount="infinite"
        style={[styles.light, styles.redLight]}
      />
      {/* Flashing Blue Light */}
      <Animatable.View
        animation="flash"
        iterationCount="infinite"
        delay={500}
        style={[styles.light, styles.blueLight]}
      />
      <Text style={styles.warningText}>Fake Police Siren Activated</Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Stop & Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    opacity: 0.8,
  },
  redLight: {
    backgroundColor: 'red',
    top: '20%',
    left: '10%',
  },
  blueLight: {
    backgroundColor: 'blue',
    top: '20%',
    right: '10%',
  },
  warningText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SirenScreen;
