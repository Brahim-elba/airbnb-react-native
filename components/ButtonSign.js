// Tools
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import axios from "axios";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb, greyText, lightGrey } = colors;

const ButtonSign = ({
  nameButton,
  setTokenAndId,
  setMessageError,
  objectElementSign,
  submitUpdate,
}) => {
  const submitButton = async () => {
    // ----------------------
    // ------- SIGNIN -------
    // ----------------------
    if (nameButton === "Sign in") {
      if (!objectElementSign.email || !objectElementSign.password) {
        setMessageError("Please fill all fields");
      } else {
        try {
          setMessageError("");
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/log_in",
            {
              email: objectElementSign.email,
              password: objectElementSign.password,
            }
          );
          if (response.status === 200 && response.data.token) {
            setTokenAndId(response.data.token, response.data.id);
            alert("Successful connection !");
            setMessageError("");
          }
        } catch (error) {
          if (error.response.status === 401) {
            setMessageError("The email / password association is incorrect");
          }
          // console.log(error.message);
        }
      }

      // ----------------------
      // ------- SIGNUP -------
      // ----------------------
    } else if (nameButton === "Sign up") {
      if (
        !objectElementSign.email ||
        !objectElementSign.username ||
        !objectElementSign.description ||
        !objectElementSign.password ||
        !objectElementSign.confirmPassword
      ) {
        setMessageError("Please fill all fields");
      } else {
        if (objectElementSign.password !== objectElementSign.confirmPassword) {
          setMessageError("Passwords must be the same");
        } else {
          try {
            setMessageError("");
            const response = await axios.post(
              "https://express-airbnb-api.herokuapp.com/user/sign_up",
              {
                email: objectElementSign.email,
                username: objectElementSign.username,
                description: objectElementSign.description,
                password: objectElementSign.password,
              }
            );
            if (response.status === 200 && response.data.token) {
              setTokenAndId(response.data.token, response.data.id);
              alert("Successful registration !");
              setMessageError("");
            }
            // console.log(response.data, response.status);
          } catch (error) {
            if (
              (error.response.status === 400 &&
                error.response.data.error ===
                  "This email already has an account.") ||
              (error.response.status === 400 &&
                error.response.data.error ===
                  "This username already has an account.") ||
              (error.response.status === 400 &&
                error.response.data.error === "Missing parameters")
            ) {
              setMessageError(error.response.data.error);
            } else {
              setMessageError("An error occured");
            }
            // console.log(error.response, error.response.data.error);
          }
        }
      }
      // ----------------------
      // ------- LOG OUT -------
      // ----------------------
    } else if (nameButton === "Log out") {
      setTokenAndId(null, null);
    }
  };

  return (
    <TouchableOpacity
      style={
        nameButton === "Log out"
          ? [styles.buttonSign, styles.buttonLogOut]
          : styles.buttonSign
      }
      onPress={nameButton === "Update" ? submitUpdate : submitButton}
    >
      <Text style={styles.textButton}>{nameButton}</Text>
    </TouchableOpacity>
  );
};

export default ButtonSign;

const styles = StyleSheet.create({
  buttonSign: {
    borderColor: pinkAirbnb,
    borderWidth: 3,
    borderRadius: 30,
    height: 60,
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textButton: {
    color: greyText,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonLogOut: {
    backgroundColor: lightGrey,
  },
});
