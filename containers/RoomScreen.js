// Tools
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

// Components
import RoomsInfos from "../components/RoomsInfos";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb } = colors;

export default function HomeScreen({ route }) {
  //   const navigation = useNavigation();

  const [dataRoom, setDataRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`
        );
        setDataRoom(response.data);
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
    <View style={styles.roomScreen}>
      <RoomsInfos
        imageRoomUri={dataRoom.photos[0].url}
        priceRoom={dataRoom.price}
        titleRoom={dataRoom.title}
        ratingRoom={dataRoom.ratingValue}
        reviewsRoom={dataRoom.reviews}
        imageUserUri={dataRoom.user.account.photo.url}
        descriptionRoom={dataRoom.description}
        roomId={dataRoom._id}
        originScreen="room"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  roomScreen: { backgroundColor: "white", flex: 1 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
