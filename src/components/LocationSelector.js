import * as Location from "expo-location";

import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";

import {COLORS} from '../constants/index';
import MapPreview from "./MapPreview";

const LocationSelector = ({onLocation, mapLocation}) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [pickedLocation, setPickedLocation] = useState();
    
    useEffect(() => {
        if (mapLocation){
            setPickedLocation(mapLocation);
            onLocation(mapLocation);
        };
    }, [mapLocation]);
    
    const verifyPermissons = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(
                "Permisos insuficientes",
                "Necesita permisos de localizacion para utilizar la aplicación",
                [{text: "Ok"}]
            );
            return false;
        }
        return true;
    };

    const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissons();
        if (!isLocationOk) return;

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
        });

        setPickedLocation({
            lat: location.coords.latitude, 
            lng: location.coords.longitude,
        });
        onLocation({
            lat: location.coords.latitude, 
            lng: location.coords.longitude,
        });
    };
    const handlePickOnMap = async () => {
        const isLocationOk = await verifyPermissons();
        if (!isLocationOk) return;
        
        navigation.navigate("Map");
    };
    
    /* const mapLocation = route?.params?.mapLocation */
    
    return (
        <View style={styles.container}>
            <MapPreview location={pickedLocation} style={styles.preview}>
                <Text>Ubicación en proceso...</Text>
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title="Obtener ubicación" 
                    color={COLORS.PEACH_PUFF} 
                    onPress={handleGetLocation}
                />
                <Button 
                    title="Elegir del Mapa"
                    color={COLORS.LIGTH_PINK}
                    onPress={handlePickOnMap}
                />
            </View>
        </View>
    )
}

export default LocationSelector

const styles = StyleSheet.create({
    container:{
        marginBottom: 10,
    },
    preview:{
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    },
    Image: {
        width: "100%",
        height: "100%"
    },
    actions:{
        flexDirection:'row',
        justifyContent: 'space-around',
    }
})