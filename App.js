import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import Navigation from "./src/navigation/Navigation";
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#004E8C"} />
      <Navigation />
      <FlashMessage position={"top"} />
    </SafeAreaView>
  )
}

export default App;
