import axios from "axios";
import api from "./axios";

export const login = async (username: string, password: string) => {
  const response = await api.post("/autenticacao/login", {
    username,
    password,
  });

  return response.data;
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await axios.put(
    "https://pet-manager-api.geia.vip/autenticacao/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  return response.data;
};
