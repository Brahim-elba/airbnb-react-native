// Tools
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

// Colors
import colors from "../assets/colors";
const { pinkAirbnb } = colors;

const Logo = ({ sizeLogo }) => {
  return <FontAwesome5 name="airbnb" size={sizeLogo} color={pinkAirbnb} />;
};

export default Logo;
