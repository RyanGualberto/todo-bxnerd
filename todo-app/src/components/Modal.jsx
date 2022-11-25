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
  }, [currentTodo]);

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

  if (modalStatus) {
    return (
      <ModalTodoContainer>
        <ModalContainer>
          <ModalHeader>
            <Text>{currentTodo ? "Editar Tarefa" : "Adicionar Tarefa"}</Text>
            <CloseButton
              onClick={() => {
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
            value={title}
            onChange={(title) => setTitle(title.target.value)}
            placeholder="Título"
          />
          <Input
            value={description}
            onChange={(description) => setDescription(description.target.value)}
            placeholder="Descrição"
          />
          <ButtonPrimary onClick={() => handleTodo()}>
            <Text>{currentTodo ? "Editar" : "Adicionar"}</Text>
          </ButtonPrimary>
          {currentTodo && (
            <>
              <ButtonDelete onClick={() => handleDelete()}>
                <Text>Deletar</Text>
              </ButtonDelete>
              <ButtonSecondary>
                <Text>Marcar Como Concluída</Text>
              </ButtonSecondary>
            </>
          )}
        </ModalContainer>
      </ModalTodoContainer>
    );
  }
}
