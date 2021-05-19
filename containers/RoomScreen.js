// Tools
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";

// Components
import RoomsInfos from "../components/RoomsInfos";

export default function HomeScreen() {
  const navigation = useNavigation();

  //   const [dataRooms, setDataRooms] = useState([]);
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
    <View style={styles.roomScreen}></View>
  );
}

const styles = StyleSheet.create({
  roomScreen: { backgroundColor: "white" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});
