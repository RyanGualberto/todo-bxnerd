import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";

import {
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
} from "../styles/index.styles.js";

import Icon from "react-native-vector-icons/Feather";
import Modal from "../components/Modal";

import api from "../services/apiConnection";
import { Text, ScrollView } from "react-native";

export const ModalStateContext = React.createContext();

export default function App({ navigation }) {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState(null);
  const { user, signOut } = useAuth();
  const [allTodos, setAllTodos] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    api.get("/users/user/" + user).then((response) => {
      setCurrentUser(response.data.user);
    });
    api.get("/todos/" + user).then((todos) => {
      console.log(todos.data);
      setAllTodos(todos?.data?.data);
    });
  }, [user, modalStatus]);

  return (
    <ModalStateContext.Provider
      value={{ currentTodo, setCurrentTodo, modalStatus, setModalStatus }}
    >
      {modalStatus ? (
        <Modal />
      ) : (
        <ModalContainer>
          <ProfileInfoContainer>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 10,
              }}
            >
              Olá, {currentUser?.name}
            </Text>
            <CloseButton onPress={() => signOut(navigation)}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                sair
              </Text>
            </CloseButton>
          </ProfileInfoContainer>
          <SearchContainer>
            <SearchInput
              placeholderTextColor="#ffffff90"
              placeholder="Pesquisar tarefa"
            />
            <SearchButton>
              <Icon name="search" color="#fff" size={24} />
            </SearchButton>
          </SearchContainer>
          <ScrollView
            style={{
              flex: 1,
              height: "100%",
            }}
          >
            <MainContent>
              {allTodos?.map((todo) => (
                <TodoContainer
                  onPress={() => {
                    setModalStatus(true);
                    setCurrentTodo(todo);
                  }}
                  key={todo.todoId}
                >
                  <TodoTitle>{todo.title}</TodoTitle>
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    {todo.description}
                  </Text>
                </TodoContainer>
              ))}
            </MainContent>
          </ScrollView>
          <AddButton onPress={() => setModalStatus(true)}>
            <Icon name="plus" size={24} color="#fff" />
          </AddButton>
        </ModalContainer>
      )}
    </ModalStateContext.Provider>
  );
}
