import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import Sign from "../Screens/Sign";
import Home from "../Screens/Home";

import useAuth from "../hooks/useAuth";

export default function Routes() {
  const { signed, user } = useAuth();

  useEffect(() => {}, [signed, user]);

  return (
    <NavigationContainer>{signed ? <Home /> : <Sign />}</NavigationContainer>
  );
}
