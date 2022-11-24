import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

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
import { GrClose } from "react-icons/gr";

import { ModalStateContext } from "../pages/App";
import api from "../services/apiConnection";
import useAuth from "../hooks/useAuth";

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
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(error.response.data.message);
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
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.error(error.response);
          toast.error(error.response.data.message);
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
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      });
  }

  if (modalStatus) {
    return (
      <ModalTodoContainer>
        <ModalContainer>
          <ModalHeader>
            <h1>{currentTodo ? "Editar Tarefa" : "Adicionar Tarefa"}</h1>
            <CloseButton
              onClick={() => {
                setTitle("");
                setDescription("");
                setModalStatus(false);
                setCurrentTodo(null);
              }}
            >
              <GrClose size={24} color="#fff" />
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
            {currentTodo ? "Editar" : "Adicionar"}
          </ButtonPrimary>
          {currentTodo && (
            <>
              <ButtonDelete onClick={() => handleDelete()}>
                Deletar
              </ButtonDelete>
              <ButtonSecondary>Marcar Como Concluída</ButtonSecondary>
            </>
          )}
        </ModalContainer>
      </ModalTodoContainer>
    );
  }
}
