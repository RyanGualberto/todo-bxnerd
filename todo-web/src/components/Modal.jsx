import React from "react";

import { ModalStateContext } from "../pages/App";
import {
  CloseButton,
  ModalTodoContainer,
  ModalContainer,
  ModalHeader,
} from "../styles/index.styles";
import { GrClose } from "react-icons/gr";

export default function Modal() {
  const { modalStatus, setModalStatus } = React.useContext(ModalStateContext);

  console.log(modalStatus);

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
        </ModalContainer>
      </ModalTodoContainer>
    );
  }
}
