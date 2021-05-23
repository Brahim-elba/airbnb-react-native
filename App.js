// Tools
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Containers
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

// Components
import Logo from "./components/Logo";

// Colors
import colors from "./assets/colors";
const { pinkAirbnb } = colors;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setTokenAndId = async (token, user_id) => {
    if (token && user_id) {
      AsyncStorage.setItem("userToken", token);
      AsyncStorage.setItem("user_id", user_id);
    } else {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("user_id");
    }

    setUserToken(token);
    setUserId(user_id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("user_id");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn">
            {() => <SignInScreen setTokenAndId={setTokenAndId} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {() => <SignUpScreen setTokenAndId={setTokenAndId} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: pinkAirbnb,
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: <Logo sizeLogo={34} />,
                          headerStyle: {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: <Logo sizeLogo={34} />,
                          headerStyle: { backgroundColor: "white" },
                          headerBackTitleVisible: false,
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Around me"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name="ios-location-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around me"
                        options={{
                          title: <Logo sizeLogo={34} />,
                          headerStyle: {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="My profile"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="user" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="My profile"
                        options={{
                          title: <Logo sizeLogo={34} />,
                          headerStyle: {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        {(props) => (
                          <ProfileScreen
                            {...props}
                            userId={userId}
                            setTokenAndId={setTokenAndId}
                            userToken={userToken}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
