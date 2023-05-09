import axios from "axios";

const gameAPI = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const createNewAccount = async (postedAccount) => {
  console.log(postedAccount);

  const response = await gameAPI.post("/auth/signup", postedAccount);
  console.log(response.data);
  return response.data;
};

export const login = async (account) => {
  // console.log(account);
  const response = await gameAPI.post("/login", account);
  return response.data;
};

export const getUsers = async () => {
  console.log("in api file");
  const response = await gameAPI.get("/characters");
  return response;
};

// /log

export const getAllBattles = async () => {
  const response = await gameAPI.get("/log");
  return response;
};
