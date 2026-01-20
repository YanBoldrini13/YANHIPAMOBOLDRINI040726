import api from "./axios";

export const login = async (username, password) => {
  const response = await api.post("/autenticacao/login", {
    username,
    password,
  });

  return response.data;
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await api.put(
    "/autenticacao/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  return response.data;
};
