import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import useAuth from "../hooks/useAuth";

export default function Sign() {
  const [signInMode, setSignInMode] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const { signIn, signUp, responseMessage, signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ff0000",
      }}
    >
      <Text style={styles.title}>{signInMode ? "Login" : "Cadastro"}</Text>
      {!signInMode && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title={signInMode ? "Sign In" : "Sign Up"}
        onPress={() => {
          signInMode ? signIn(email, password) : signUp(name, email, password);
        }}
      />
      <Button
        title={signInMode ? "Sign Up" : "Sign In"}
        onPress={() => {
          setSignInMode(!signInMode);
          setPassword("");
        }}
      />
      <Button
        title={signInMode ? "Sign Up" : "Sign In"}
        onPress={() => {
          signOut();
        }}
      />
      <Text style={styles.responseMessage}>{responseMessage}</Text>
    </View>
  );
}

// Path: todo-app\src\Screens\Sign.jsx

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
