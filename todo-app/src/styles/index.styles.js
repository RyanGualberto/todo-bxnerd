import styled from "styled-components";

const ModalContainer = styled.View`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #333;
  padding: 20px;
  flex: 1;
  z-index: ${(props) => (props.modal ? 10 : 0)};
  height: 100%;
  width: 100%;
`;

const Input = styled.TextInput`
  font-weight: 700;
  font-size: 16px;
  color: #ffff;
  flex: 1;
  max-height: 44px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 10px;
`;

const ButtonPrimary = styled.TouchableOpacity`
  background-color: #4caf50;
  font-weight: 700;
  padding: 15px 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: 4px 2px;
`;

const ButtonSecondary = styled.TouchableOpacity`
  background-color: ${(props) => (props.disabled ? "#2196f350" : "#2196f3")};
  padding: 15px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin: 4px 2px;
`;

const ButtonDelete = styled.TouchableOpacity`
  background-color: #f44336;
  align-items: center;
  padding: 15px 32px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  margin: 4px 2px;
  max-height: 44px;
`;

const SearchContainer = styled.View`
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

const SearchInput = styled.TextInput`
  flex: 1;
  height: 60px;
  max-height: 60px;
  padding-left: 5px;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
`;

const SearchButton = styled.TouchableOpacity`
  background-color: #4caf50;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 5px;
  border-radius: 6px;
  color: #fff;
`;

const AddButton = styled.TouchableOpacity`
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
`;

const ModalTodoContainer = styled.View`
  display: flex;
  position: absolute;
  background-color: #000000;
  height: 100%;
  width: 100%;
  z-index: 5;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.TouchableOpacity`
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
`;

const ModalHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #000;
  margin-bottom: 10px;
`;

const ProfileInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #333;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const TodoContainer = styled.TouchableOpacity`
  padding: 10px 10px;
  border: 0.5px solid #ccc;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const TodoTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`;

const MainContent = styled.View`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export {
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
