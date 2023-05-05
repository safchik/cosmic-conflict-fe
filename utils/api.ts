import axios from "axios";

const gameAPI = axios.create({
  baseURL: "http://localhost:9090/api"
});

export const postAccount = async (postedAccount) => {
  console.log(postedAccount);
  const response = await gameAPI.post("/signup", postedAccount);
  return response.data;
};

export const login = async (account) => {
  console.log(account);
  const response = await gameAPI.post("/login", account);
  return response.data;
};
