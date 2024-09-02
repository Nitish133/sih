// app/safetyTips.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const safetyTipsData = [
  {
    title: 'Stay Aware of Your Surroundings',
    icon: 'eye',
    description:
      'Always stay alert and be aware of what is happening around you. Avoid distractions like looking at your phone while walking.',
  },
  {
    title: 'Trust Your Instincts',
    icon: 'heart',
    description:
      'If you feel uncomfortable or unsafe, trust your instincts and remove yourself from the situation immediately.',
  },
  {
    title: 'Keep Emergency Numbers Handy',
    icon: 'phone',
    description:
      'Save emergency contacts and important numbers on speed dial. It’s essential to have quick access in case of emergencies.',
  },
  {
    title: 'Avoid Isolated Areas',
    icon: 'map-marker',
    description:
      'Try to avoid walking or staying in isolated areas, especially at night. Stick to well-lit and populated paths.',
  },
  {
    title: 'Self-Defense Awareness',
    icon: 'hand-rock',
    description:
      'Enroll in a self-defense class to learn basic moves. Knowing how to protect yourself can be a valuable skill.',
  },
  {
    title: 'Share Your Plans',
    icon: 'share',
    description:
      'Always share your travel plans and location with someone you trust. Let them know when you’ve arrived safely.',
  },
  {
    title: 'Stay Connected',
    icon: 'wifi',
    description:
      'Keep your phone charged and ensure you have mobile data or Wi-Fi access. This allows you to quickly seek help if needed.',
  },
  {
    title: 'Use Safety Apps',
    icon: 'shield-alt',
    description:
      'Install safety apps on your phone that can send alerts, share your location, or provide quick access to emergency services.',
  },
  {
    title: 'Avoid Oversharing on Social Media',
    icon: 'exclamation-triangle',
    description:
      'Limit what you share online about your location and activities. Oversharing can make you a target for potential threats.',
  },
  {
    title: 'Learn Basic First Aid',
    icon: 'medkit',
    description:
      'Knowing basic first aid can be crucial in emergencies. Learn how to handle minor injuries or assist someone in need.',
  },
];

const SafetyTips = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleTipPress = (tip) => {
    setSelectedTip(tip);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTip(null);
  };

  const toggleFavorite = (tip) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(tip)
        ? prevFavorites.filter((fav) => fav !== tip)
        : [...prevFavorites, tip]
    );
  };

  const filteredTips = safetyTipsData.filter((tip) =>
    tip.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Animatable.Text animation="bounceIn" style={styles.title}>
        Safety Tips
      </Animatable.Text>

      {/* Search Bar */}
      <Animatable.View animation="lightSpeedIn" style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tips..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </Animatable.View>

      <View style={styles.tipsContainer}>
        {filteredTips.map((tip, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tipCard,
              favorites.includes(tip) && { backgroundColor: '#ffcccc' },
            ]}
            onPress={() => handleTipPress(tip)}
            activeOpacity={0.8}
          >
            <Animatable.View
              animation="flipInX"
              duration={800}
              style={styles.tipIconContainer}
            >
              <FontAwesome name={tip.icon} size={30} color="#fff" />
            </Animatable.View>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(tip)}
              style={styles.favoriteButton}
            >
              <MaterialIcons
                name={favorites.includes(tip) ? 'favorite' : 'favorite-border'}
                size={24}
                color={favorites.includes(tip) ? '#e91e63' : '#888'}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal to display detailed information */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTip?.title}</Text>
            <Text style={styles.modalDescription}>{selectedTip?.description}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  tipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipCard: {
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
  tipIconContainer: {
    backgroundColor: '#333',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  tipTitle: {
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

export default SafetyTips;
