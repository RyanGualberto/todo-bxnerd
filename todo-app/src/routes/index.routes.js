import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import Sign from "../Screens/Sign";
import Home from "../Screens/Home";

import useAuth from "../hooks/useAuth";

import { createStackNavigator } from "@react-navigation/stack";

export default function Routes() {
  const { signed } = useAuth();
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={signed ? "Home" : "Sign"}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sign" component={Sign} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
