import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffff;
  border-radius: 5px;
  padding: 20px;
  width: 60vw;
  height: 500px;
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  flex: 1;
  max-height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ButtonPrimary = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const ButtonSecondary = styled.button`
  background-color: ${(props) => (props.disabled ? "#2196f350" : "#2196f3")};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const SearchContainer = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-height: 60px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 60px;
  max-height: 60px;
  padding-left: 5px;
  border: none;
`;

const SearchButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 5px;
  border-radius: 6px;
  cursor: pointer;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: absolute;
  right: 20px;
  bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
`;

const ModalTodoContainer = styled.div`
  display: flex;
  position: absolute;
  background-color: #00000050;
  height: 100vh;
  width: 100vw;
  z-index: 2;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: #f44336;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: absolute;
  right: 20px;
  top: 10px;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #000;
  margin-bottom: 10px;
`;

export {
  Container,
  ModalContainer,
  Input,
  ButtonPrimary,
  ButtonSecondary,
  SearchContainer,
  SearchInput,
  SearchButton,
  AddButton,
  ModalTodoContainer,
  CloseButton,
  ModalHeader,
};
