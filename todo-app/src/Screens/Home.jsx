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
  TodoStatus,
} from "../styles/index.styles.js";

import Icon from "react-native-vector-icons/Feather";
import Modal from "../components/Modal";

import api from "../services/apiConnection";
import { Text, ScrollView, RefreshControl, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { userContext } from "../contexts/userContext";

export const ModalStateContext = React.createContext();

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function App({ navigation }) {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState(null);
  const { user, signOut, responseMessage } = useAuth();
  const [allTodos, setAllTodos] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);
  const { userLoaded } = React.useContext(userContext);
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    console.log(user);
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@RNAuth:user");

      if (storageUser) {
        api.get("/users/user/" + JSON.parse(storageUser)).then((response) => {
          setCurrentUser(response.data.user);
        });
        if (search === "") {
          api.get("/todos/" + JSON.parse(storageUser)).then((response) => {
            setAllTodos(response.data.data);
            setLoaded(true);
          });
        } else {
          api
            .get("/todos/search/" + JSON.parse(storageUser) + "/" + search)
            .then((response) => {
              setAllTodos(response.data.data);
              setLoaded(true);
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      }
    }
    loadStorageData();
  }, [modalStatus, userLoaded, refreshing, search]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }
    >
      <ModalStateContext.Provider
        value={{ currentTodo, setCurrentTodo, modalStatus, setModalStatus }}
      >
        {modalStatus && <Modal />}
        <ModalContainer
          style={{
            minHeight: Dimensions.get("window").height,
          }}
        >
          {loaded ? (
            <>
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
                  onChangeText={(text) => setSearch(text)}
                  value={search}
                />
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
                      <TodoStatus done={todo.done} />
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
            </>
          ) : (
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Carregando...
            </Text>
          )}
        </ModalContainer>
      </ModalStateContext.Provider>
    </ScrollView>
  );
}
