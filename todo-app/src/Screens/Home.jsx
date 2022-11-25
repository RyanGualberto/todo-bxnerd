import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

import {
  Container,
  ModalContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  AddButton,
  ProfileInfoContainer,
  CloseButton,
  TodoContainer,
  TodoTitle,
  MainContent,
} from "../styles/index.styles";

import Icon from "react-native-vector-icons/Feather";
import Modal from "../components/Modal";

import api from "../services/apiConnection";
import { Text } from "react-native";

export const ModalStateContext = React.createContext();

export default function App() {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState(null);
  const { user, signOut } = useAuth();
  const [allTodos, setAllTodos] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    api.get("/users/user/" + user).then((response) => {
      setCurrentUser(response.data.user);
    });
    api.get("/todos/" + user).then((todos) => setAllTodos(todos?.data?.data));
  }, [user, modalStatus]);

  return (
    <ModalStateContext.Provider
      value={{ currentTodo, setCurrentTodo, modalStatus, setModalStatus }}
    >
      <Modal />
      <ModalContainer>
        <ProfileInfoContainer>
          <Text>Olá, {currentUser?.name}</Text>
          <CloseButton onClick={() => signOut()}>
            <Text>sair</Text>
          </CloseButton>
        </ProfileInfoContainer>
        <SearchContainer>
          <SearchInput placeholder="Pesquisar tarefa" />
          <SearchButton>
            <Icon name="search" size={24} />
          </SearchButton>
        </SearchContainer>
        <MainContent>
          {allTodos?.reverse().map((todo) => (
            <TodoContainer
              onClick={() => {
                setModalStatus(true);
                setCurrentTodo(todo);
              }}
              key={todo.todoId}
            >
              <TodoTitle>{todo.title}</TodoTitle>
              <Text>{todo.description}</Text>
            </TodoContainer>
          ))}
        </MainContent>
        <AddButton onClick={() => setModalStatus(true)}>
          <Icon name="plus" size={24} color="#fff" />
        </AddButton>
      </ModalContainer>
    </ModalStateContext.Provider>
  );
}
