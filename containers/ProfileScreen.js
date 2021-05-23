// RESTE LA PHOTO A FAIRE ! IL SEMBLE QU'ELLE NE VEUILLE PAS S'ENVOYER

// Tools
import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, ActivityIndicator, Text } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Comoponents
import InputText from "../components/InputText";
import ButtonSign from "../components/ButtonSign";
import TextArea from "../components/TextArea";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb, lightPink, lightGrey } = colors;

export default function ProfileScreen({ userId, setTokenAndId, userToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUser, setPictureUser] = useState();
  const [messageAfterSubmit, setMessageAfterSubmit] = useState();

  // State pour la photo
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        setDataUser(response.data);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setPictureUser(response.data.photo && response.data.photo[0].url);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const getPermissionAndPhoto = async () => {
    // Demander la permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Si permission accordé, aller récupérer la photo et la stocker
    if (status === "granted") {
      // Récupérer la photo
      const photo = await ImagePicker.launchImageLibraryAsync();

      // Si le User n'a pas annulé, on stocke la photo dans le state correspondant
      if (!photo.cancelled) {
        setPictureUser(photo.uri);
      }
    } else {
      alert("Permission d'accès à la galerie refusée");
    }
  };

  const getPermissionAndCamera = async () => {
    // Demander la permission au User d'accéder à sa caméra
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    // Si permission accordé, prendre la photo et la stocker
    if (status === "granted") {
      // Prendre la photo
      const photo = await ImagePicker.launchCameraAsync();

      // Si le User n'a pas annulé, on stocke la photo dans le state correspondant
      if (!photo.cancelled) {
        setPictureUser(photo.uri);
      }
    } else {
      alert("Permission d'accès à la caméra refusée");
    }
  };

  const submitUpdate = async () => {
    try {
      if (
        dataUser.email === email &&
        dataUser.username === username &&
        dataUser.description === description &&
        dataUser.photo[0].url === pictureUser
      ) {
        setMessageAfterSubmit("You must make at least one modification");
      } else {
        // Update infos
        if (
          dataUser.email !== email ||
          dataUser.username !== username ||
          dataUser.description !== description
        ) {
          const response = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/update",
            { email: email, username: username, description: description },
            { headers: { Authorization: `Bearer ${userToken}` } }
          );
          setDataUser(response.data);
          setEmail(response.data.email);
          setUsername(response.data.username);
          setDescription(response.data.description);
          setMessageAfterSubmit("");
          alert("Updated information");
        }

        // Update picture
        if (dataUser.photo[0].url !== pictureUser) {
          const tab = pictureUser.split(".");
          const formData = new FormData();
          formData.append("photo", {
            uri: pictureUser,
            name: `picture-user.${tab[tab.length - 1]}`,
            type: `image/${tab[tab.length - 1]}`,
          });

          const photoSubmit = await axios.put(
            "https://express-airbnb-api.herokuapp.com/user/upload_picture",
            formData,
            { headers: { Authorization: `Bearer ${userToken}` } }
          );
          setDataUser(photoSubmit.data);
          setPictureUser(photoSubmit.data.photo[0].url);
          setMessageAfterSubmit("");
          alert("Updated information");
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={pinkAirbnb} />
    </View>
  ) : (
    <View style={styles.profileScreen}>
      <View style={styles.topProfileScreen}>
        <View style={styles.containerPictureUser}>
          {pictureUser ? (
            <Image
              source={{ uri: pictureUser }}
              style={styles.pictureUser}
              resizeMode="cover"
            />
          ) : (
            <FontAwesome5
              style={styles.noPictureUser}
              name="user-alt"
              size={90}
              color={lightGrey}
            />
          )}
        </View>

        <View style={styles.buttonsPicture}>
          <MaterialCommunityIcons
            name="image-multiple"
            size={26}
            color="grey"
            onPress={getPermissionAndPhoto}
          />
          <Entypo
            name="camera"
            size={26}
            color="grey"
            onPress={getPermissionAndCamera}
          />
        </View>
      </View>
      <View style={styles.middleProfileScreen}>
        <InputText
          nameInput="email"
          valueInput={email}
          setValueInput={setEmail}
        />
        <InputText
          nameInput="username"
          valueInput={username}
          setValueInput={setUsername}
        />
        <TextArea
          nameTextArea="description"
          valueTextArea={description}
          setValueTextArea={setDescription}
        />
      </View>

      <View style={styles.bottomProfileScreen}>
        <Text style={styles.messageAfterSubmit}>{messageAfterSubmit}</Text>
        <ButtonSign
          submitUpdate={() => {
            submitUpdate();
          }}
          nameButton="Update"
        />
        <ButtonSign nameButton="Log out" setTokenAndId={setTokenAndId} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  profileScreen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 20,
  },
  topProfileScreen: {
    flexDirection: "row",
    justifyContent: "center",
  },
  containerPictureUser: {
    padding: 10,
    borderRadius: 80,
    borderColor: lightPink,
    borderWidth: 2,
    marginRight: 20,
    height: 160,
    width: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  pictureUser: {
    height: 130,
    width: 130,
    borderRadius: 80,
  },
  noPictureUser: { padding: 10 },
  buttonsPicture: { justifyContent: "space-evenly" },
  middleProfileScreen: {},

  bottomProfileScreen: {
    alignItems: "center",
  },

  messageAfterSubmit: {
    color: pinkAirbnb,
    marginBottom: 10,
  },
});
