// Tools
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import MapView, { CalloutSubview, Marker } from "react-native-maps";
import * as Location from "expo-location";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb } = colors;

const AroundMeScreen = () => {
  const navigation = useNavigation();

  const [latitudeUser, setLatitudeUser] = useState(null);
  const [longitudeUser, setLongitudeUser] = useState(null);
  const [dataRooms, setDataRooms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Création de variables fictives représentant les coordonnées de l'utilisation. Mon iPhone étant localisé à Grenoble, ça ne fonctionnait pas, la requête renvoyait un code 400
  const latitudeTest = 48.859382;
  const longitudeTest = 2.344397;

  useEffect(() => {
    const getPermissionAndFetchData = async () => {
      try {
        // Demander la permission d'accéder aux coordonnées GPS du smartphone du User
        const { status } = await Location.requestForegroundPermissionsAsync();

        // Récupérer les coordonnées si le User a autoriser l'accès à ses coordonnées
        if (status === "granted") {
          const locationUser = await Location.getCurrentPositionAsync();
          //   console.log(locationUser);
          setLatitudeUser(locationUser.coords.latitude);
          setLongitudeUser(locationUser.coords.longitude);
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${latitudeTest}&longitude=${longitudeTest}`
          );
          setDataRooms(response.data);
          setIsLoading(false);
        } else {
          const response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
          setDataRooms(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getPermissionAndFetchData();
  }, []);

  return isLoading ? (
    <View style={styles.loaderScreen}>
      <MapView style={styles.mapViewLoader}>
        <ActivityIndicator size="large" color={pinkAirbnb} />
      </MapView>
    </View>
  ) : (
    // Intègre les valeurs tests de localisation du User
    <MapView
      style={styles.mapView}
      initialRegion={{
        latitude: latitudeTest,
        longitude: longitudeTest,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {dataRooms.map((elem) => {
        return (
          <Marker
            key={elem._id}
            coordinate={{
              latitude: elem.location[1],
              longitude: elem.location[0],
            }}
            title={elem.title}
            description={elem.description}
            onCalloutPress={() => {
              navigation.navigate("Room", { roomId: elem._id });
            }}
          />
        );
      })}
    </MapView>
  );
};

export default AroundMeScreen;

const styles = StyleSheet.create({
  loaderScreen: { flex: 1 },
  mapView: { flex: 1 },
  mapViewLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.4,
  },
});
