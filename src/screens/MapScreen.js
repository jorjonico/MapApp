import MapView, { Marker } from "react-native-maps";
import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";

const initialRegion = {
    latitude: 37.4219023,
    longitude: -122.0839984,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState("")
  const handleSelectedLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };
  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.container}
      onPress={handleSelectedLocation}
      >
      {selectedLocation && (
        <Marker 
        title="Ubicación seleccionada" 
        coordinate={{
          latitude: selectedLocation.lat, 
          longitude: selectedLocation.lng
        }}
        />
      )}
      </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
