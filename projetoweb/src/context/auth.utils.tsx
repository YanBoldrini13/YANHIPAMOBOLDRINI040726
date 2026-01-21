type User = {
  username: string;
};

export const getInitialUser = (): User | null => {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  if (token && username) {
    return { username };
  }

  return null;
};
