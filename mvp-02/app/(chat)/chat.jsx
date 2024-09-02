
// app/ChatScreen.js
import React, { useState } from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  console.log(messages)

  const handleSend = async () => {
  
try {
    const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        {
          contents: [
            {
              parts: [{ text:"hii" }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            key: 'AIzaSyD7JdX6G2XwlU23uhF6cz4FOrnpxI7PIt0', // Replace with your actual API key
          },
        }
      );

    
      console.log(response)
} catch (error) {
    console.log(error)
}
  
    }
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSend}>
        <Text>
            clich
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#f0f0f0',
  },
});

export default ChatScreen;
