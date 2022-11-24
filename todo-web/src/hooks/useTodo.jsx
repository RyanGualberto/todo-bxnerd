import React from "react";
import api from "../services/apiConnection";
import useAuth from "./useAuth";

export default function useTodo() {
  const { user } = useAuth();
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const response = await api
      .get("/todos/" + user)
      .then((todos) => todos?.data?.data);

    setTodos(response);

    return response;
  }

  return { getTodos, todos };
}
