import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-api-bxnerd.vercel.app/api/v1",
});

export default api;
