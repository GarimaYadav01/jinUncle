import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import Navigation from "./src/navigation/Navigation";
import FlashMessage from 'react-native-flash-message';
import AuthContext, { AuthProvider } from "./src/screen/context/AuthContext";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#004E8C"} />
      <AuthProvider>
        <Navigation />
        <FlashMessage position={"top"} />
      </AuthProvider>
    </SafeAreaView>
  )
}

export default App;
