import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-api-bxnerd-m53r2ohh4-ryangualberto.vercel.app/api/v1",
});

export default api;
