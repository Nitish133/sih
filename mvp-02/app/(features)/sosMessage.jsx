import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import * as Animatable from 'react-native-animatable'; // Animations

const SendLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to get the current location of the user
  const getLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to access your location.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to open Google Maps with the current location
  const openGoogleMaps = () => {
    if (!location) {
      Alert.alert('Location Not Available', 'Please get your location first.');
      return;
    }

    const { latitude, longitude } = location.coords;
    const url = `https://www.google.com/maps/search/?api=1&query=police+station&query_place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&location=${latitude},${longitude}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open Google Maps.');
    });
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Send Your Current Location
      </Animatable.Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e91e63" />
      ) : (
        <TouchableOpacity style={styles.getLocationButton} onPress={getLocation}>
          <Text style={styles.buttonText}>Get My Location</Text>
        </TouchableOpacity>
      )}

      {location && (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>

          <TouchableOpacity style={styles.openMapButton} onPress={openGoogleMaps}>
            <Text style={styles.buttonText}>Find Nearest Police Station</Text>
          </TouchableOpacity>
        </>
      )}

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e91e63',
    marginBottom: 20,
  },
  getLocationButton: {
    backgroundColor: '#4d88ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  openMapButton: {
    backgroundColor: '#0056A0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#e91e63',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SendLocationScreen;
