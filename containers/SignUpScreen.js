import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";

// Comoponents
import Logo from "../components/Logo";
import InputText from "../components/InputText";
import ButtonSign from "../components/ButtonSign";
import TextArea from "../components/TextArea";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb, greyText } = colors;

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [missingParameters, setMissingParameters] = useState("");

  const objectElementSign = {
    email: email,
    username: username,
    description: description,
    password: password,
    confirmPassword: confirmPassword,
  };

  return (
    <KeyboardAwareScrollView style={styles.pageSignUp}>
      <View style={styles.containerSignUp}>
        <View style={styles.topPageSignUp}>
          <Logo sizeLogo={100} />
          <Text style={styles.textUnderLogo}>Sign up</Text>
        </View>
        <View style={styles.middlePageSignUp}>
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
            nameTextArea="Describe yourself in a few words..."
            valueInput={description}
            setValueTextArea={setDescription}
          />
          <InputText
            nameInput="password"
            valueInput={password}
            setValueInput={setPassword}
          />
          <InputText
            nameInput="confirm password"
            valueInput={confirmPassword}
            setValueInput={setConfirmPassword}
          />
        </View>
        <View style={styles.bottomPageSignUp}>
          <Text style={styles.textMissingParams}>{missingParameters}</Text>
          <ButtonSign
            nameButton="Sign up"
            setToken={setToken}
            setMessageError={setMissingParameters}
            objectElementSign={objectElementSign}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.linkSignInPage}>
              Already have an account ? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  pageSignUp: {},
  containerSignUp: {
    backgroundColor: "white",
    height: Dimensions.get("window").height,
    paddingBottom: 30,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
    justifyContent: "space-around",
  },

  topPageSignUp: {
    alignItems: "center",
    justifyContent: "center",
  },

  textUnderLogo: {
    marginTop: 20,
    color: greyText,
    fontSize: 22,
    fontWeight: "600",
  },

  middlePageSignUp: {
    justifyContent: "center",
  },

  bottomPageSignUp: {
    justifyContent: "center",
    alignItems: "center",
  },

  textMissingParams: {
    color: pinkAirbnb,
    marginBottom: 10,
  },

  linkSignInPage: {
    color: greyText,
  },
});
