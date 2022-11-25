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

  async function signIn(email, password) {
    const response = await api
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        return { message: response.data.message, uid: response.data.uid };
      })
      .catch((error) => {
        return { message: error.response.data.message, uid: null };
      });

    const { message, uid } = response;

    if (uid) {
      await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(response));
      setUser(response);
    }
    setResponseMessage(message);
  }

  async function signOut() {
    const response = await api
      .post("/users/logout", {
        uid: user.uid,
      })
      .then((response) => {
        return { message: response.data.message };
      })
      .catch((error) => {
        console.log(error.response.data);
        return { message: error.response.data.message };
      });

    const { message } = response;

    if (message === "User logged out") {
      await AsyncStorage.clear().then(() => {
        setUser(null);
      });
    }
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
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        setResponseMessage(error.response.data.message);
      });
  }

  return { signed: !!user, user, signIn, signOut, signUp, responseMessage };
}
