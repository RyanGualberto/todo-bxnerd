import React from "react";
import api from "../services/apiConnection";

import { toast } from "react-hot-toast";

export default function useAuth() {
  const [user, setUser] = React.useState(null);
  const [responseMessage, setResponseMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function loadStorageData() {
      const storageUser = await localStorage.getItem("@RNAuth:user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    }
    loadStorageData();
  }, []);

  async function signIn(email, password) {
    setLoading(true);
    const response = await api
      .post("/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        toast.success(response.data.message);
        window.location.href = "/";

        return { message: response.data.message, uid: response.data.uid };
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Ocorreu um erro!");
        return { message: error?.response?.data?.message, uid: null };
      })
      .finally(() => {
        setLoading(false);
      });

    const { message, uid } = response;

    if (uid) {
      await localStorage.setItem("@RNAuth:user", JSON.stringify(uid));
      setUser(uid);
    }
    setResponseMessage(message);
  }

  async function signOut() {
    setLoading(true);
    const response = await api
      .post("/users/logout", {
        uid: user.uid,
      })
      .then((response) => {
        toast.success(response.data.message);
        window.location.href = "/";
        localStorage.removeItem("@RNAuth:user");
        return { message: response.data.message };
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Ocorreu um erro!");
        return { message: error?.response?.data?.message };
      })
      .finally(() => {
        setLoading(false);
      });

    const { message } = response;
    setResponseMessage(message);
  }

  async function signUp(name, email, password) {
    setLoading(true);
    await api
      .post("/users/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        toast.success(response.data.message);
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Ocorreu um erro!");
        setResponseMessage(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {
    signed: !!user,
    user,
    signIn,
    signOut,
    signUp,
    responseMessage,
    loading,
  };
}
