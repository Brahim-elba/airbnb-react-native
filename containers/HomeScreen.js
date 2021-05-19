// Tools
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";

// Components
import RoomsInfos from "../components/RoomsInfos";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb } = colors;

export default function HomeScreen() {
  const navigation = useNavigation();

  const [dataRooms, setDataRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setDataRooms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator
        size="large"
        color={pinkAirbnb}
        style={{ marginTop: 100 }}
      />
    </View>
  ) : (
    <FlatList
      style={styles.homeScreen}
      data={dataRooms}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <RoomsInfos
            imageRoomUri={item.photos[0].url}
            priceRoom={item.price}
            titleRoom={item.title}
            ratingRoom={item.ratingValue}
            reviewsRoom={item.reviews}
            imageUserUri={item.user.account.photo.url}
            descriptionRoom={item.description}
            roomId={item._id}
            originScreen="home"
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  homeScreen: { backgroundColor: "white" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
