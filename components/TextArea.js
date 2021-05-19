// Tools
import React from "react";
import { StyleSheet, TextInput } from "react-native";

// Colors
import colors from "../assets/colors";
const { lightPink } = colors;

const TextArea = ({ nameTextArea, valueTextArea, setValueTextArea }) => {
  return (
    <TextInput
      style={styles.textArea}
      placeholder={nameTextArea}
      onChangeText={(text) => {
        setValueTextArea(text);
      }}
      value={valueTextArea}
      multiline
      textAlignVertical
      numberOfLines={4}
    />
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textArea: {
    height: 80,
    borderColor: lightPink,
    borderWidth: 2,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
});
