import React from "react";

import { ModalStateContext } from "../pages/App";
import {
  CloseButton,
  ModalTodoContainer,
  ModalContainer,
  ModalHeader,
  Input,
  ButtonPrimary,
} from "../styles/index.styles";

import { GrClose } from "react-icons/gr";
import api from "../services/apiConnection";
import useAuth from "../hooks/useAuth";

export default function Modal() {
  const { modalStatus, setModalStatus } = React.useContext(ModalStateContext);
  const [title, setTitle] = React.useState("");
  const { user } = useAuth();
  const [description, setDescription] = React.useState("");

  async function handleTodo() {
    api
      .post("/todos/" + user, {
        title,
        description,
      })
      .then((response) => {
        console.log(response.data);
        setModalStatus(false);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  if (modalStatus) {
    return (
      <ModalTodoContainer>
        <ModalContainer>
          <ModalHeader>
            <h1>Adicionar Tarefa</h1>
            <CloseButton onClick={() => setModalStatus(false)}>
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
          <ButtonPrimary onClick={() => handleTodo()}>Adicionar</ButtonPrimary>
        </ModalContainer>
      </ModalTodoContainer>
    );
  }
}
