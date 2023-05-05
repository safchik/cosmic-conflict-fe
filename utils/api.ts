import axios from "axios";

const gameAPI = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const createNewAccount = async (postedAccount) => {
  try {
    const response = await gameAPI.post("/auth/signup", postedAccount);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const login = async (account) => {
  // console.log(account);
  const response = await gameAPI.post("/login", account);
  return response.data;
};

export const getUsers = async () => {
  const response = await gameAPI.get("/characters");
  return response;
};

export const createNewCharacter = async (postedCharacter) => {
  console.log(postedCharacter);
  const response = await gameAPI.post("/characters", postedCharacter);
  console.log(response.data);
  return response.data;
};

export const getUserCharacter = async (queryKey, queryValue) => {
  console.log(queryKey, queryValue);
  const response = await gameAPI.get(`/characters?${queryKey}=${queryValue}`);
  console.log(response.data);
  return response.data;
};
