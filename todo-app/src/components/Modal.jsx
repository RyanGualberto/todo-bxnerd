import React, { useEffect } from "react";

import {
  CloseButton,
  ModalTodoContainer,
  ModalContainer,
  ModalHeader,
  Input,
  ButtonPrimary,
  ButtonSecondary,
  ButtonDelete,
} from "../styles/index.styles";
import Icon from "react-native-vector-icons/AntDesign";

import { ModalStateContext } from "../Screens/Home";
import api from "../services/apiConnection";
import useAuth from "../hooks/useAuth";

import { Text } from "react-native";

export default function Modal() {
  const { modalStatus, setModalStatus, currentTodo, setCurrentTodo } =
    React.useContext(ModalStateContext);
  const [title, setTitle] = React.useState("");
  const { user } = useAuth();
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
    }
  }, [currentTodo, modalStatus]);

  async function handleTodo() {
    if (currentTodo) {
      await api
        .put("/todos/" + user + "/" + currentTodo.todoId, {
          todoId: currentTodo.todoId,
          title,
          description,
          done: false,
        })
        .then((response) => {
          setCurrentTodo(null);
          setDescription("");
          setTitle("");
          setModalStatus(false);
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      api
        .post("/todos/" + user, {
          title,
          description,
          done: false,
        })
        .then((response) => {
          console.log(response.data);
          setDescription("");
          setTitle("");
          setModalStatus(false);
        })
        .catch((error) => {
          console.error(error.response);
        });
    }
  }

  async function handleDelete() {
    await api
      .delete("/todos/" + user + "/" + currentTodo.todoId)
      .then((response) => {
        setCurrentTodo(null);
        setDescription("");
        setTitle("");
        setModalStatus(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  console.log(title, description);

  if (modalStatus) {
    return (
      <ModalTodoContainer>
        <ModalContainer Modal={true}>
          <ModalHeader
            style={{
              marginTop: 30,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 10,
              }}
            >
              {currentTodo ? "Editar Tarefa" : "Adicionar Tarefa"}
            </Text>
            <CloseButton
              onPress={() => {
                setTitle("");
                setDescription("");
                setModalStatus(false);
                setCurrentTodo(null);
              }}
            >
              <Icon name="close" size={24} color="#fff" />
            </CloseButton>
          </ModalHeader>
          <Input
            placeholderTextColor="#ffffff90"
            value={title}
            style={{
              color: "#fff",
            }}
            onChangeText={(title) => setTitle(title)}
            placeholder="Título"
          />
          <Input
            placeholderTextColor="#ffffff90"
            style={{
              color: "#fff",
            }}
            value={description}
            onChangeText={(description) => setDescription(description)}
            placeholder="Descrição"
          />
          <ButtonPrimary onPress={() => handleTodo()}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {currentTodo ? "Editar" : "Adicionar"}
            </Text>
          </ButtonPrimary>
          {currentTodo && (
            <>
              <ButtonDelete onPress={() => handleDelete()}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Deletar
                </Text>
              </ButtonDelete>
              <ButtonSecondary>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Marcar Como Concluída
                </Text>
              </ButtonSecondary>
            </>
          )}
        </ModalContainer>
      </ModalTodoContainer>
    );
  }
}
