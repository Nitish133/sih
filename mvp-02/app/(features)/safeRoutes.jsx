// SafeRouteScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';

// List of police stations with latitude and longitude
const policeStations = [
  { name: "Adhartal Police Station", latitude: 23.2042, longitude: 79.9550 },
  { name: "Barela Police Station", latitude: 23.2177, longitude: 80.0645 },
  { name: "Belbagh Police Station", latitude: 23.1733, longitude: 79.9341 },
  { name: "Civil Lines Police Station", latitude: 23.1768, longitude: 79.9334 },
  { name: "Garha Police Station", latitude: 23.1845, longitude: 79.9006 },
  { name: "Gohalpur Police Station", latitude: 23.1885, longitude: 79.9465 },
  { name: "Hanumantal Police Station", latitude: 23.1694, longitude: 79.9550 },
  { name: "Khamaria Police Station", latitude: 23.2270, longitude: 79.9848 },
  { name: "Lordganj Police Station", latitude: 23.1725, longitude: 79.9441 },
  { name: "Madan Mahal Police Station", latitude: 23.1874, longitude: 79.9467 },
  { name: "Omti Police Station", latitude: 23.1686, longitude: 79.9408 },
  { name: "Patan Police Station", latitude: 23.3386, longitude: 80.0274 },
  { name: "Ranjhi Police Station", latitude: 23.2070, longitude: 79.9632 },
  { name: "Sanjeevani Nagar Police Station", latitude: 23.1690, longitude: 79.9005 },
  { name: "Sihora Police Station", latitude: 23.4894, longitude: 80.1098 },
  { name: "Tilwara Police Station", latitude: 23.2461, longitude: 79.9525 },
  { name: "Vijay Nagar Police Station", latitude: 23.1878, longitude: 79.9835 },
  { name: "Kotwali Police Station", latitude: 23.1788, longitude: 79.9454 },
  { name: "Civil Line Police Station", latitude: 23.1764, longitude: 79.9386 },
  { name: "Sadar Bazar Police Station", latitude: 23.1754, longitude: 79.9754 },
  { name: "Jabalpur Police Control Room", latitude: 23.1815, longitude: 79.9864 },
];

// Function to calculate the distance between two coordinates using the Haversine formula
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const SafeRouteScreen = () => {
  const [location, setLocation] = useState(null);
  const [nearestStation, setNearestStation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Request location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to find the nearest police station.');
          setLoading(false);
          return;
        }

        // Get current location
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // Find the nearest police station
        const nearest = policeStations.reduce((prev, curr) => {
          const prevDistance = getDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            prev.latitude,
            prev.longitude
          );
          const currDistance = getDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            curr.latitude,
            curr.longitude
          );
          return currDistance < prevDistance ? curr : prev;
        });

        setNearestStation(nearest);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch location. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e91e63" />
        <Text style={styles.loadingText}>Finding Safe Route...</Text>
      </View>
    );
  }

  if (!location || !nearestStation) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to determine location or nearest police station.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* User's location marker */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Your Location"
          pinColor="blue"
        />

        {/* Nearest police station marker */}
        <Marker
          coordinate={{
            latitude: nearestStation.latitude,
            longitude: nearestStation.longitude,
          }}
          title={nearestStation.name}
          pinColor="red"
        />

        {/* Route line between user's location and nearest police station */}
        <Polyline
          coordinates={[
            { latitude: location.coords.latitude, longitude: location.coords.longitude },
            { latitude: nearestStation.latitude, longitude: nearestStation.longitude },
          ]}
          strokeColor="#e91e63" // Line color
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Nearest Police Station:</Text>
        <Text style={styles.stationName}>{nearestStation.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stationName: {
    fontSize: 18,
    color: '#e91e63',
    marginTop: 5,
  },
});

export default SafeRouteScreen;
