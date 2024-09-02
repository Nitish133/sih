// app/home.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Import icons

// Sample data for features
const features = [
  { title: 'Emergency Call', screen: '/emergencyCall', icon: 'phone', color: '#ff4d4d' },
  { title: 'Share Location', screen: '/locationSharing', icon: 'map-marker', color: '#4d88ff' },
  { title: 'Fake Call', screen: '/fakeCall', icon: 'phone-square', color: '#ffb84d' },
  { title: 'Safety Tips', screen: '/safetyTips', icon: 'info-circle', color: '#66b3ff' },
  { title: 'Face Detection', screen: '/faceDetection', icon: 'camera', color: '#ff6666' },
  { title: 'Self-Defense', screen: '/selfDefense', icon: 'shield', color: '#66ff66' },
  { title: 'Fake Sounds', screen: '/fakePolice', icon: 'bell', color: '#ff80aa' },
  { title: 'SOS Message', screen: '/sosMessage', icon: 'envelope', color: '#d93636' },
  { title: 'Nearby Police Stations', screen: '/policeStations', icon: 'building', color: '#4da6ff' },
  { title: 'Safe Routes', screen: '/safeRoutes', icon: 'road', color: '#b3ccff' },
];

const MainScreen = () => {
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://designimages.appypie.com/appbackground/appbackground-12-face-plant.jpg' }} // Replace with an actual URL of an animated or gradient background image
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            source={{ uri: 'https://play-lh.googleusercontent.com/TaTLTfMmizPjOn2HODyhonkGdKyzsjGWJnVbg3SPbsZLBLP28ypzTVYXkd-mMWZroA=w480-h960-rw' }} // Replace with the official government logo
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Women Safety App</Text>
        </Animatable.View>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              delay={index * 100}
              style={styles.featureWrapper}
            >
              <TouchableOpacity
                style={[styles.featureButton, { backgroundColor: feature.color }]}
                onPress={() => handleNavigation(feature.screen)}
                activeOpacity={0.7}
              >
                <Animatable.View animation="bounceIn" style={styles.featureIconContainer}>
                  <FontAwesome name={feature.icon} size={30} color="#fff" />
                </Animatable.View>
                <Animatable.Text
                  animation="pulse"
                  iterationCount="infinite"
                  style={styles.featureText}
                >
                  {feature.title}
                </Animatable.Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureWrapper: {
    width: (Dimensions.get('window').width - 60) / 2,
    marginBottom: 20,
  },
  featureButton: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  featureIconContainer: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  featureText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MainScreen;
