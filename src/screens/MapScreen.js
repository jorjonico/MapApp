import { StyleSheet, Text, View } from "react-native";

import MapView from "react-native-maps";
import React from "react";

const MapScreen = () => {
  const initialRegion = {
    latittude: 37.4219023,
    longitude: -122.0839984,
    latittudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  
  return <MapView initialRegion={initialRegion} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
