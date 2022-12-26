import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import {COLORS} from '../constants/index';
import MapPreview from '../components/MapPreview';
import React from "react";
import { useSelector } from "react-redux";

const PlaceDetailScreen = ({route}) => {
  const { placeId } = route.params;
  const place = useSelector((state) => 
    state.places.places.find((item) => item.id === placeId)
  );
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.address}</Text>
      </View>
      <Image source={{uri: place.image}} style={styles.image}/>
      <View style={styles.location}>
        <View style={styles.addressContainer}>
        <Text>{"Mapa"}</Text>
        </View>
        <MapPreview 
          style={styles.map} 
          location={{lat:place.lat, lng: place.lng}}>
          <Text>Ubicación NO disponible</Text>
        </MapPreview>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    padding: 20,
  },
  location: {
    margin: 20,
    width: "90%",
    maxWidth: 350,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: COLORS.MAROON,
    textAlign: "center",
  },
  map: {
    height: 300,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 15,
  },
});

export default PlaceDetailScreen;
