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
  Load,
  TodoStatus,
} from "../styles/index.styles";

import { BsPlusLg, BsSearch } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import Modal from "../components/Modal";

import api from "../services/apiConnection";

export const ModalStateContext = React.createContext();

export default function App() {
  const [modalStatus, setModalStatus] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState(null);
  const { signOut } = useAuth();
  const [allTodos, setAllTodos] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("@RNAuth:user"));
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    api.get("/users/user/" + user).then((response) => {
      setCurrentUser(response.data.user);
    });
    api.get("/todos/" + user).then((todos) => {
      setAllTodos(todos?.data?.data);
      setLoaded(true);
    });
  }, [modalStatus]);

  return (
    <ModalStateContext.Provider
      value={{ currentTodo, setCurrentTodo, modalStatus, setModalStatus }}
    >
      <>
        <Modal />
        <Container>
          <ModalContainer className={!loaded && "loaded"}>
            {loaded ? (
              <>
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
                <MainContent>
                  {allTodos?.reverse().map((todo) => (
                    <TodoContainer
                      onClick={() => {
                        setModalStatus(true);
                        setCurrentTodo(todo);
                      }}
                      key={todo.todoId}
                    >
                      <TodoStatus done={todo.done} />
                      <TodoTitle>{todo.title}</TodoTitle>
                      <p>{todo.description}</p>
                    </TodoContainer>
                  ))}
                </MainContent>
                <AddButton onClick={() => setModalStatus(true)}>
                  <BsPlusLg size={24} color="#fff" />
                </AddButton>
              </>
            ) : (
              //circulo de progresso
              <>
                <BiTask className="iconTask" size={48} color="#fff" />
                <Load></Load>
              </>
            )}
          </ModalContainer>
        </Container>
      </>
    </ModalStateContext.Provider>
  );
}
