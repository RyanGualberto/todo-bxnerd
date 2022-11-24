import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import PrivateRoutes from "./privated.routes";
import Sign from "../Screens/Sign";

import useAuth from "../hooks/useAuth";

export default function Routes() {
  const { signed } = useAuth();

  return (
    <NavigationContainer>
      {signed ? <PrivateRoutes /> : <Sign />}
    </NavigationContainer>
  );
}
