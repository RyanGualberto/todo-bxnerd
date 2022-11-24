import React from "react";

import {
  Container,
  ModalContainer,
  Input,
  ButtonPrimary,
  ButtonSecondary,
} from "../styles/index.styles";
import useAuth from "../hooks/useAuth";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Sign() {
  const [registerMode, setRegisterMode] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn, signUp, loading } = useAuth();

  const handleSign = () => {
    if (registerMode) {
      signUp(name, email, password);
    } else {
      signIn(email, password);
    }
  };

  return (
    <Container>
      <ModalContainer>
        <h1>{registerMode ? "Cadastro" : "Login"}</h1>
        {registerMode && (
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <ButtonPrimary disabled={loading} onClick={handleSign}>
          {loading ? (
            <AiOutlineLoading3Quarters
              size={20}
              color="#fff"
              className="loading"
            />
          ) : registerMode ? (
            "Cadastrar"
          ) : (
            "Entrar"
          )}
        </ButtonPrimary>
        <ButtonSecondary
          disabled={loading}
          onClick={() => setRegisterMode(!registerMode)}
        >
          {registerMode
            ? "Já tem uma conta? Faça login"
            : "Não tem uma conta? Cadastre-se"}
        </ButtonSecondary>
      </ModalContainer>
    </Container>
  );
}
