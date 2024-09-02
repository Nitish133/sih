import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

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
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const PoliceStationsMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [stationsWithDistances, setStationsWithDistances] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to find the nearest police station.');
        return;
      }

      // Fetch current location
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    fetchLocation();
  }, []);

  // Function to calculate distances to all stations and sort them
  const calculateDistances = () => {
    if (!userLocation) {
      Alert.alert('Location Not Available', 'Unable to fetch your location.');
      return;
    }

    // Calculate distance of each police station from the user's current location
    const distances = policeStations.map((station) => {
      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        station.latitude,
        station.longitude
      );

      return { ...station, distance: distance.toFixed(2) }; // Format distance to 2 decimal places
    });

    // Sort the stations by distance (nearest first)
    distances.sort((a, b) => a.distance - b.distance);
    setStationsWithDistances(distances);
  };

  useEffect(() => {
    if (userLocation) {
      calculateDistances();
    }
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <Button title="Find Police Stations Near Me" onPress={calculateDistances} />

      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Marker for user's current location */}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />

          {/* Markers for each police station */}
          {stationsWithDistances.map((station, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.name}
              description={`Distance: ${station.distance} km`}
            />
          ))}
        </MapView>
      )}

      {/* Display the list of police stations with distances */}
      <ScrollView style={styles.scrollView}>
        {stationsWithDistances.map((station, index) => (
          <View key={index} style={styles.stationContainer}>
            <Text style={styles.stationName}>{station.name}</Text>
            <Text style={styles.stationDistance}>Distance: {station.distance} km</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  scrollView: {
    marginTop: 20,
    width: '100%',
  },
  stationContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  stationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stationDistance: {
    fontSize: 14,
    color: '#555',
  },
});

export default PoliceStationsMap;
