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
  background-color: #333;
  border-radius: 5px;
  padding: 20px;
  width: 60vw;
  height: 500px;
  box-shadow: 6px 6px 10px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const Input = styled.input`
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  flex: 1;
  background-color: transparent;
  max-height: 44px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 10px;
`;

const ButtonPrimary = styled.button`
  background-color: #4caf50;
  font-weight: 700;
  border: none;
  color: #fff;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 6px;
  margin: 4px 2px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #3e8e41;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
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
  font-weight: 700;
  border-radius: 6px;
  margin: 4px 2px;
  cursor: pointer;
  max-height: 44px;
  transition: 0.3s;

  &:hover {
    background-color: #0b7dda;
  }

  &:active {
    background-color: #0b7dda;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:disabled {
    background-color: #2196f350;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonDelete = styled.button`
  background-color: #f44336;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 700;
  border-radius: 6px;
  margin: 4px 2px;
  cursor: pointer;
  max-height: 44px;
  transition: 0.3s;

  &:hover {
    background-color: #ba000d;
  }

  &:active {
    background-color: #ba000d;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  &:disabled {
    background-color: #f4433650;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
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
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  border: none;
  background-color: transparent;
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
  color: #fff;
  cursor: pointer;
`;

const AddButton = styled.button`
  background-color: #4caf50;
  color: #fff;
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
  border-radius: 6px;
  color: #fff;
  font-size: 18px;
  text-transform: capitalize;
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

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #fff;
  margin-bottom: 10px;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  flex: 1;
  border: 1px solid #fff;
  border-radius: 6px;
  max-height: 70px;
  margin: 10px 0;
`;

const TodoTitle = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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
  ProfileInfoContainer,
  TodoContainer,
  TodoTitle,
  MainContent,
  ButtonDelete,
};
