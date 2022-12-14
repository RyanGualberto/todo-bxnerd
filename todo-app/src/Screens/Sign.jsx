import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View } from "react-native";

import {
  ModalContainer,
  Input,
  ButtonPrimary,
  ButtonSecondary,
} from "../styles/index.styles";
import useAuth from "../hooks/useAuth";

export default function Sign({ navigation }) {
  const [registerMode, setRegisterMode] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn, signUp, loading, responseMessage, user, setResponseMessage } =
    useAuth();
  const [toastVisible, setToastVisible] = React.useState(false);

  const handleSign = () => {
    if (registerMode) {
      signUp(name, email, password);
    } else {
      signIn(email, password, navigation);
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, responseMessage]);

  useEffect(() => {
    if (responseMessage) {
      setToastVisible(true);
      responseMessage === "Usuário criado com sucesso" &&
        setRegisterMode(!registerMode);
      setTimeout(() => {
        setToastVisible(false);
        setResponseMessage("");
      }, 3000);
    }
  }, [responseMessage]);

  return (
    <ModalContainer
      style={{
        justifyContent: "center",
        width: "100%",
        flex: 1,
      }}
    >
      {responseMessage && toastVisible && (
        <View
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            position: "absolute",
            top: 35,
            zIndex: 1,
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            paddingVertical: 10,
            alignSelf: "center",
            borderWidth: 1,
            borderColor:
              responseMessage === "Usuário criado com sucesso"
                ? "#00ff00"
                : responseMessage === "Usuário logado com sucesso"
                ? "#00ff00"
                : "#ff0000",
          }}
        >
          <Icon
            name={
              responseMessage === "Usuário logado com sucesso"
                ? "check-circle"
                : responseMessage === "Usuário criado com sucesso"
                ? "check-circle"
                : "error"
            }
            size={42}
            color={
              responseMessage === "Usuário logado com sucesso"
                ? "#00ff00"
                : responseMessage === "Usuário criado com sucesso"
                ? "#00ff00"
                : "#ff0000"
            }
          />
          <Text
            style={{
              marginLeft: 10,
              color: "#333",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {responseMessage}
          </Text>
        </View>
      )}

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#fff",
        }}
      >
        {registerMode ? "Cadastro" : "Login"}
      </Text>
      {registerMode && (
        <Input
          placeholder="Nome"
          placeholderTextColor="#ffffff90"
          value={name}
          onChangeText={(e) => setName(e)}
        />
      )}
      <Input
        placeholder="Email"
        value={email}
        placeholderTextColor="#ffffff90"
        onChangeText={(e) => setEmail(e)}
      />
      <Input
        placeholder="Senha"
        value={password}
        placeholderTextColor="#ffffff90"
        onChangeText={(e) => setPassword(e)}
      />
      <ButtonPrimary disabled={loading} onPress={() => handleSign()}>
        {loading ? (
          <Icon size={20} color="#fff" name="loading" />
        ) : registerMode ? (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Cadastrar
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Entrar
          </Text>
        )}
      </ButtonPrimary>
      <ButtonSecondary
        disabled={loading}
        onPress={() => {
          setEmail("");
          setPassword("");
          setName("");
          setRegisterMode(!registerMode);
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {registerMode
            ? "Já tem uma conta? Faça login"
            : "Não tem uma conta? Cadastre-se"}
        </Text>
      </ButtonSecondary>
    </ModalContainer>
  );
}
