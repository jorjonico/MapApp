import * as FileSystem from "expo-file-system";

import Map from "../constants/Map";

export const ADD_PLACE = "ADD_PLACE";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${Map.API_KEY}`);
    if(!response.ok) throw new Error('No se a podido comunicar con Google Maps API')
    const resData = await response.json();
    if(!resData.results)
      throw new Error(
        'No se a encontrado datos para las coordenadas seleccionadas'
        );
      const address = resData.results[0].formatted_address;
      console.log(address);
    
    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: Path,
      });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
    dispatch({ type: ADD_PLACE, payload: { title, image: Path, address, lat: location.lat, lng: location.lng },});
  };
};
