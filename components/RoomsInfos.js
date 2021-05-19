// Tools
import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

// Colors
import colors from "../assets/colors";
const { orangeStarRating, greyStarRating, lightGrey } = colors;

const RoomsInfos = ({
  imageRoomUri,
  priceRoom,
  titleRoom,
  ratingRoom,
  reviewsRoom,
  imageUserUri,
  roomId,
}) => {
  const tabRating = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingRoom) {
      tabRating.push(1);
    } else {
      tabRating.push(0);
    }
  }

  return (
    <TouchableOpacity style={styles.blockRoomInfos}>
      <View style={styles.topBlockRoomInfos}>
        <Image
          source={{ uri: imageRoomUri }}
          style={styles.imageRoom}
          resizeMode="cover"
        />
        <Text style={styles.priceRoom}>{priceRoom} €</Text>
      </View>
      <View style={styles.bottomBlockRoomInfos}>
        <View style={styles.titleAndRating}>
          <View style={styles.blockTitleText}>
            <Text style={styles.titleText} numberOfLines={1}>
              {titleRoom}
            </Text>
          </View>
          <View style={styles.ratingAndReviews}>
            <View style={styles.blockRating}>
              {tabRating.map((elem, index) => {
                return (
                  <Entypo
                    name="star"
                    size={22}
                    color={elem === 1 ? orangeStarRating : greyStarRating}
                    key={index}
                  />
                );
              })}
            </View>
            <View style={styles.blockReviews}>
              <Text style={styles.textReviews}>{reviewsRoom} reviews</Text>
            </View>
          </View>
        </View>
        <Image
          source={{ uri: imageUserUri }}
          style={styles.imageUser}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default RoomsInfos;

const styles = StyleSheet.create({
  blockRoomInfos: {
    width: "100%",
    padding: 15,
    paddingBottom: 0,
    marginBottom: 15,
  },
  topBlockRoomInfos: { position: "relative" },
  imageRoom: { width: "100%", height: 200 },
  priceRoom: {
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    position: "absolute",
    bottom: 10,
  },
  bottomBlockRoomInfos: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: lightGrey,
    borderBottomWidth: 2,
  },
  titleAndRating: {
    flex: 1,
    width: "75%",
    height: "100%",
  },
  blockTitleText: {
    height: "50%",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
  },
  ratingAndReviews: {
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  blockRating: { flexDirection: "row", marginRight: 10 },
  blockReviews: { flexDirection: "row" },
  textReviews: { color: "grey" },
  imageUser: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
