import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#004E8C"} />
      <FlashMessage position={"top"} />
      <Navigation />
    </SafeAreaView>

  )
}
export default App;