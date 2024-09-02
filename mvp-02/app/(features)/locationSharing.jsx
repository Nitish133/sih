// SendLocationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location';
import { Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable'; // Animations
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Icons for better visuals

const SendLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [highAccuracy, setHighAccuracy] = useState(true); // State to toggle location accuracy
  const router = useRouter();

  // Function to get the current location of the user
  const getLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to send your location.');
        setStatus('Permission Denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: highAccuracy
          ? Location.Accuracy.Highest
          : Location.Accuracy.Balanced,
      });
      setLocation(location);
      setStatus('Location Found');
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
      setStatus('Error Fetching Location');
    } finally {
      setLoading(false);
    }
  };

  // Function to send location via WhatsApp
  const sendLocationWhatsApp = () => {
    if (!location) {
      Alert.alert('Location Not Available', 'Please get your location first.');
      setStatus('Location Not Available');
      return;
    }

    const { latitude, longitude } = location.coords;
    const message = `I'm here: https://www.google.com/maps?q=${latitude},${longitude}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on your device.');
      setStatus('WhatsApp Not Installed');
    });
  };

  // Function to send location via SMS
  const sendLocationSMS = () => {
    if (!location) {
      Alert.alert('Location Not Available', 'Please get your location first.');
      setStatus('Location Not Available');
      return;
    }

    const { latitude, longitude } = location.coords;
    const message = `I'm here: https://www.google.com/maps?q=${latitude},${longitude}`;
    const url = `sms:?body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open the messaging app.');
      setStatus('SMS App Not Available');
    });
  };

  // Function to copy location link to clipboard
  const copyLocationLink = () => {
    if (!location) {
      Alert.alert('Location Not Available', 'Please get your location first.');
      return;
    }

    const { latitude, longitude } = location.coords;
    const link = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Clipboard.setString(link);
    setStatus('Location Copied to Clipboard');
    Alert.alert('Copied', 'Location link copied to clipboard!');
  };

  // Function to toggle location accuracy
  const toggleAccuracy = () => {
    setHighAccuracy((prev) => !prev);
    Alert.alert(
      'Accuracy Toggled',
      highAccuracy
        ? 'Switched to Balanced Accuracy Mode.'
        : 'Switched to High Accuracy Mode.'
    );
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Send Your Current Location
      </Animatable.Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0056A0" />
      ) : (
        <Animatable.View animation="bounceIn">
          <TouchableOpacity
            style={styles.getLocationButton}
            onPress={getLocation}
          >
            <Text style={styles.buttonText}>
              <FontAwesome name="map-marker" size={20} /> Get My Location
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {location && (
        <>
          <Animatable.Text
            animation="fadeIn"
            style={styles.statusText}
          >
            {status}
          </Animatable.Text>
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
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={getLocation}
          >
            <MaterialIcons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </>
      )}

      <Animatable.View animation="fadeInUp" delay={200}>
        <TouchableOpacity
          style={styles.whatsappButton}
          onPress={sendLocationWhatsApp}
        >
          <Text style={styles.buttonText}>
            <FontAwesome name="whatsapp" size={20} /> Send via WhatsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smsButton}
          onPress={sendLocationSMS}
        >
          <Text style={styles.buttonText}>
            <FontAwesome name="envelope" size={20} /> Send via SMS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.copyButton}
          onPress={copyLocationLink}
        >
          <Text style={styles.buttonText}>
            <FontAwesome name="clipboard" size={20} /> Copy Location Link
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accuracyButton}
          onPress={toggleAccuracy}
        >
          <Text style={styles.buttonText}>
            <FontAwesome
              name={highAccuracy ? 'check-circle' : 'times-circle'}
              size={20}
            />{' '}
            {highAccuracy ? 'High Accuracy' : 'Balanced Accuracy'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>
          <FontAwesome name="arrow-left" size={18} /> Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0056A0',
    marginBottom: 20,
    textAlign: 'center',
  },
  getLocationButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  smsButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  copyButton: {
    backgroundColor: '#ffb84d',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  accuracyButton: {
    backgroundColor: '#607d8b',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  refreshButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#0056A0',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#0056A0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
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
  statusText: {
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default SendLocationScreen;
