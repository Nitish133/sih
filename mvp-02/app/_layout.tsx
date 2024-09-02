// app/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarHidden:true
       // Hide header for a full-screen look
      }}
    />
  );
}
