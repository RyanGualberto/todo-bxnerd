import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home.jsx";
import Menu from "../Screens/Menu.jsx";

const Tabs = createBottomTabNavigator();

export default function PrivateRoutes() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Menu" component={Menu} />
    </Tabs.Navigator>
  );
}
