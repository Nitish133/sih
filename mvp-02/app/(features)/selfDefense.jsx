// app/selfDefense.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Sample data for self-defense techniques
const techniques = [
    {
      title: 'Palm Strike',
      icon: 'hand-paper-o',
      description: 'Use the heel of your palm to strike your attacker’s nose or chin with an upward motion.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTCqo4jdolEmpPfgLW4sBFJLn2qdrrrgiUIQ&s', // Replace with actual image URLs
    },
    {
      title: 'Knee Strike',
      icon: 'hand-rock-o',
      description: 'Lift your knee and strike the groin area of the attacker to disarm them quickly.',
      image: 'https://example.com/knee-strike.jpg',
    },
    {
      title: 'Elbow Strike',
      icon: 'hand-lizard-o',
      description: 'Use your elbow to strike the attacker’s head or chest, which can deliver a powerful blow.',
      image: 'https://example.com/elbow-strike.jpg',
    },
    {
      title: 'Escape from Wrist Hold',
      icon: 'hand-peace-o',
      description: 'Twist your wrist against the attacker’s thumb grip and pull out quickly.',
      image: 'https://example.com/wrist-escape.jpg',
    },
    {
      title: 'Front Kick',
      icon: 'hand-scissors-o',
      description: 'Use your foot to kick the attacker’s knee or groin, aiming for a disabling effect.',
      image: 'https://example.com/front-kick.jpg',
    },
    {
      title: 'Bear Hug Escape',
      icon: 'hand-spock-o',
      description: 'If grabbed from behind, drop your weight, stomp on the attacker’s foot, and strike with your elbow.',
      image: 'https://example.com/bear-hug-escape.jpg',
    },
    {
      title: 'Eye Gouge',
      icon: 'eye',
      description: 'Use your fingers to push into the attacker’s eyes as a last-resort defense to escape.',
      image: 'https://example.com/eye-gouge.jpg',
    },
    {
      title: 'Hammer Fist',
      icon: 'hand-grab-o',
      description: 'Use the base of your fist to strike the attacker’s nose, jaw, or neck with forceful downward motion.',
      image: 'https://example.com/hammer-fist.jpg',
    },
    {
      title: 'Chokehold Escape',
      icon: 'hand-holding',
      description: 'Tuck your chin, pull down on the attacker’s arm, and use your body weight to break free.',
      image: 'https://example.com/chokehold-escape.jpg',
    },
    {
      title: 'Shin Kick',
      icon: 'shoe-prints',
      description: 'Kick the attacker’s shin to destabilize and create an opportunity to escape.',
      image: 'https://example.com/shin-kick.jpg',
    },
    {
      title: 'Hair Grab Defense',
      icon: 'hand-point-up',
      description: 'If grabbed by the hair, control the attacker’s hand, use your free hand to strike, and break free.',
      image: 'https://example.com/hair-grab-defense.jpg',
    },
    {
      title: 'Tactical Pen Strike',
      icon: 'pen',
      description: 'Use a tactical pen or any pointed object to jab the attacker’s hand, face, or soft tissue areas.',
      image: 'https://example.com/tactical-pen-strike.jpg',
    },
  ];
  

const SelfDefense = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleTechniquePress = (technique) => {
    setSelectedTechnique(technique);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTechnique(null);
  };

  const toggleFavorite = (technique) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(technique)
        ? prevFavorites.filter((fav) => fav !== technique)
        : [...prevFavorites, technique]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        Self-Defense Techniques
      </Animatable.Text>
      <View style={styles.techniquesContainer}>
        {techniques.map((technique, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.techniqueCard,
              favorites.includes(technique) && { backgroundColor: '#ffcccc' },
            ]}
            onPress={() => handleTechniquePress(technique)}
            activeOpacity={0.8}
          >
            <Animatable.View
              animation="bounce"
              duration={800}
              style={styles.techniqueIconContainer}
            >
              <FontAwesome name={technique.icon} size={30} color="#fff" />
            </Animatable.View>
            <Text style={styles.techniqueTitle}>{technique.title}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(technique)}
              style={styles.favoriteButton}
            >
              <MaterialIcons
                name={favorites.includes(technique) ? 'favorite' : 'favorite-border'}
                size={24}
                color={favorites.includes(technique) ? '#e91e63' : '#888'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal to display detailed information */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <Animatable.View animation="zoomIn" style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTechnique?.title}</Text>
            <Image
              source={{ uri: selectedTechnique?.image }}
              style={styles.modalImage}
              resizeMode="cover"
            />
            <Text style={styles.modalDescription}>{selectedTechnique?.description}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e91e63',
    textAlign: 'center',
    marginBottom: 20,
  },
  techniquesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  techniqueCard: {
    backgroundColor: '#4d88ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  techniqueIconContainer: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  techniqueTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#e91e63',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SelfDefense;
