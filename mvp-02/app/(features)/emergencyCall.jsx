// app/call-page.js
import { useEffect } from "react";
import { View, Button, Alert, Linking } from "react-native";
import { router, useRouter } from "expo-router";
import { Route } from "expo-router/build/Route";
export default function CallPage() {
    const Route = useRouter()
  const handleCall = async () => {
    const phoneNumber = "tel:100";

    // Check if the device can handle the call
    const supported = await Linking.canOpenURL(phoneNumber);
    if (supported) {
      // Open the dialer with the number 100
      await Linking.openURL(phoneNumber);
    } else {
      Alert.alert("Error", "Unable to open the dialer.");
    }
  };
  
useEffect(() => {handleCall()},[])
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Back" onPress={()=>router.push("/home")} />
    </View>
  );
}
