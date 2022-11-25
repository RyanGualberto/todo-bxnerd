import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/apiConnection";

export default function useAuth() {
  const [user, setUser] = React.useState(null);
  const [responseMessage, setResponseMessage] = React.useState("");

  React.useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@RNAuth:user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }
    loadStorageData();
  }, []);

  async function signIn(email, password, navigation) {
    const response = await api
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        navigation.navigate("Home");
        AsyncStorage.setItem("@RNAuth:user", JSON.stringify(response.data.uid));
        setUser(response.data.uid);
        return { message: response.data, uid: response.data.uid };
      })
      .catch((error) => {
        console.log("login", error.response.data.message);
        return { message: error.response.data.message, uid: null };
      });

    const { message, uid } = response;

    setResponseMessage(message?.message);
  }

  async function signOut(navigation) {
    const response = await api
      .post("/users/logout", {
        uid: user.uid,
      })
      .then((response) => {
        navigation.navigate("Sign");
        AsyncStorage.clear().then(() => {
          setUser({
            uid: null,
          });
        });
        return { message: response.data.message };
      })
      .catch((error) => {
        console.log(error.response.data);
        return { message: error.response.data.message };
      });

    const { message } = response;

    setResponseMessage(message);
  }

  async function signUp(name, email, password) {
    await api
      .post("/users/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        setResponseMessage(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        setResponseMessage(error.response.data.message);
      });
  }

  return { signed: !!user, user, signIn, signOut, signUp, responseMessage };
}
