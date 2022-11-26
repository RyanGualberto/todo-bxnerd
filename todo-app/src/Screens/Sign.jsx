import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text } from "react-native";

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
  const { signIn, signUp, loading, responseMessage, user } = useAuth();

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
  }, [user]);

  return (
    <ModalContainer
      style={{
        justifyContent: "center",
        width: "100%",
        flex: 1,
      }}
    >
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
      {responseMessage && (
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {responseMessage}
        </Text>
      )}
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
