import React, { useEffect } from "react";

import { FlatList } from "react-native";
import PlaceItem from "../components/PlaceItem";
import { useSelector } from "react-redux";

const PlaceListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    console.log(places);
  }, [places]);

  const renderItem = ({ item }) => (
    <PlaceItem
      title={item.title}
      image={item.image}
      address={item.address}
      onSelect={() => navigation.navigate("Detalle")}
    />
  );

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default PlaceListScreen;
