import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useTodo from "../hooks/useTodo";

import {
  Container,
  ModalContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  AddButton,
  ProfileInfoContainer,
  CloseButton,
} from "../styles/index.styles";

import { BsPlusLg, BsSearch } from "react-icons/bs";
import Modal from "../components/Modal";

import api from "../services/apiConnection";

export const ModalStateContext = React.createContext();

export default function App() {
  const [modalStatus, setModalStatus] = React.useState(false);
  const { user, signOut } = useAuth();
  const [allTodos, setAllTodos] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    api.get("/users/user/" + user).then((response) => {
      setCurrentUser(response.data.user);
    });
    api.get("/todos/" + user).then((todos) => setAllTodos(todos?.data?.data));
  }, [user]);

  return (
    <ModalStateContext.Provider value={{ modalStatus, setModalStatus }}>
      <Modal />
      <Container>
        <ModalContainer>
          <ProfileInfoContainer>
            <h1>Olá, {currentUser?.name}</h1>
            <CloseButton onClick={() => signOut()}>sair</CloseButton>
          </ProfileInfoContainer>
          <SearchContainer>
            <SearchInput placeholder="Pesquisar tarefa" />
            <SearchButton>
              <BsSearch size={24} />
            </SearchButton>
          </SearchContainer>
          <AddButton onClick={() => setModalStatus(true)}>
            <BsPlusLg size={24} color="#fff" />
          </AddButton>
        </ModalContainer>
      </Container>
    </ModalStateContext.Provider>
  );
}
