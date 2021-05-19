// Tools
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";

// Colors
import colors from "../assets/colors";
const { orangeStarRating, greyStarRating, lightGrey, greyText } = colors;

const RoomsInfos = ({
  imageRoomUri,
  priceRoom,
  titleRoom,
  ratingRoom,
  reviewsRoom,
  imageUserUri,
  descriptionRoom,
  roomId,
  originScreen,
}) => {
  const navigation = useNavigation();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const tabRating = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingRoom) {
      tabRating.push(1);
    } else {
      tabRating.push(0);
    }
  }

  const handleShowDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <TouchableOpacity
      style={
        originScreen === "home"
          ? styles.blockRoomInfos
          : originScreen === "room" && [
              styles.blockRoomInfos,
              styles.blockRoomInfosOnRoomScreen,
            ]
      }
      onPress={
        originScreen === "home"
          ? () => {
              navigation.navigate("Room", { roomId: roomId });
            }
          : null
      }
    >
      <View
        style={
          originScreen === "home"
            ? styles.topBlockRoomInfos
            : originScreen === "room" && [
                styles.topBlockRoomInfos,
                styles.imageFullWidth,
              ]
        }
      >
        <Image
          source={{ uri: imageRoomUri }}
          style={
            originScreen === "home"
              ? styles.imageRoom
              : originScreen === "room" && [
                  styles.imageRoom,
                  styles.imageRoomOnRoomScreen,
                ]
          }
          resizeMode="cover"
        />
        <Text style={styles.priceRoom}>{priceRoom} €</Text>
      </View>
      <View
        style={
          originScreen === "home"
            ? [styles.bottomBlockRoomInfos, styles.borderBottomBlockInfos]
            : originScreen === "room" && styles.bottomBlockRoomInfos
        }
      >
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
      {originScreen === "room" && (
        <View>
          <Text
            style={styles.descriptionRoom}
            numberOfLines={showFullDescription ? null : 3}
            onPress={handleShowDescription}
          >
            {descriptionRoom}
          </Text>
          <TouchableOpacity
            style={styles.showDescriptionButton}
            onPress={handleShowDescription}
          >
            <Text style={styles.showDescriptionButtonText}>
              {showFullDescription ? "Show less" : "Show more"}
            </Text>
            {showFullDescription ? (
              <AntDesign name="caretup" size={14} color={greyStarRating} />
            ) : (
              <AntDesign name="caretdown" size={14} color={greyStarRating} />
            )}
          </TouchableOpacity>
        </View>
      )}
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
  blockRoomInfosOnRoomScreen: { paddingTop: 0 },
  topBlockRoomInfos: { position: "relative" },
  imageFullWidth: { width: Dimensions.get("window").width, marginLeft: -15 },
  imageRoom: { width: "100%", height: 200 },
  imageRoomOnRoomScreen: {
    height: 250,
  },
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
  },
  borderBottomBlockInfos: {
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
  descriptionRoom: {
    textAlign: "justify",
    fontWeight: "600",
  },
  showDescriptionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  showDescriptionButtonText: {
    color: greyStarRating,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 5,
  },
});
