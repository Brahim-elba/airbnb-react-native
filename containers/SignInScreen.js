// Tools
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

// Comoponents
import Logo from "../components/Logo";
import InputText from "../components/InputText";
import ButtonSign from "../components/ButtonSign";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb, greyText } = colors;

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [missingParameters, setMissingParameters] = useState("");

  const objectElementSign = { email: email, password: password };

  return (
    <KeyboardAwareScrollView style={styles.pageSignIn}>
      <View style={styles.containerSignIn}>
        <View style={styles.topPageSignIn}>
          <Logo sizeLogo={100} />
          <Text style={styles.textUnderLogo}>Sign in</Text>
        </View>
        <View style={styles.middlePageSignIn}>
          <InputText
            nameInput="email"
            valueInput={email}
            setValueInput={setEmail}
          />
          <InputText
            nameInput="password"
            valueInput={password}
            setValueInput={setPassword}
          />
        </View>
        <View style={styles.bottomPageSignIn}>
          <Text style={styles.textMissingParams}>{missingParameters}</Text>
          <ButtonSign
            nameButton="Sign in"
            setToken={setToken}
            setMessageError={setMissingParameters}
            objectElementSign={objectElementSign}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.linkRegisterPage}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  pageSignIn: {},
  containerSignIn: {
    backgroundColor: "white",
    height: Dimensions.get("window").height,
    paddingBottom: 30,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
    justifyContent: "space-evenly",
  },

  topPageSignIn: {
    alignItems: "center",
    justifyContent: "center",
  },

  textUnderLogo: {
    marginTop: 20,
    color: greyText,
    fontSize: 22,
    fontWeight: "600",
  },

  middlePageSignIn: {
    justifyContent: "center",
  },

  bottomPageSignIn: {
    justifyContent: "center",
    alignItems: "center",
  },

  textMissingParams: {
    color: pinkAirbnb,
    marginBottom: 10,
  },

  linkRegisterPage: {
    color: greyText,
  },
});
