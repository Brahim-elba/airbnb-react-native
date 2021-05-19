// Tools
import React from "react";
import { StyleSheet, TextInput } from "react-native";

// Colors
import colors from "../assets/colors";
const { lightPink } = colors;

const InputText = ({ nameInput, valueInput, setValueInput }) => {
  return (
    <TextInput
      style={styles.inputText}
      placeholder={nameInput}
      onChangeText={(text) => {
        setValueInput(text);
        // console.log(valueInput);
      }}
      value={valueInput}
      secureTextEntry={
        nameInput === "password" || nameInput === "confirm password"
          ? true
          : false
      }
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputText: {
    height: 30,
    borderBottomColor: lightPink,
    borderBottomWidth: 2,
    marginTop: 15,
    marginBottom: 15,
  },
});
