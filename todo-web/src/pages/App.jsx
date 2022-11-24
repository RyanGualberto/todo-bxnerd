import React from "react";
import {
  Container,
  ModalContainer,
  SearchContainer,
  SearchInput,
  SearchButton,
  AddButton,
} from "../styles/index.styles";

import { BsPlusLg, BsSearch } from "react-icons/bs";
import Modal from "../components/Modal";

export const ModalStateContext = React.createContext();

export default function App() {
  const [modalStatus, setModalStatus] = React.useState(false);

  return (
    <ModalStateContext.Provider value={{ modalStatus, setModalStatus }}>
      <Modal />
      <Container>
        <ModalContainer>
          <SearchContainer>
            <SearchInput placeholder="Pesquisar" />
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
