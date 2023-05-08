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

export const logout = async () => {
const response = await gameAPI.post("/logout");
return response.data;
}

export const getAllCharacters = async () => {
  const response = await gameAPI.get("/characters");
  return response.data;
};

export const createNewCharacter = async (postedCharacter) => {
  console.log(postedCharacter);
  const response = await gameAPI.post("/characters", postedCharacter);
  console.log(response.data);
  return response.data;
};

export const getUserCharacter = async (queryKey, queryValue) => {
  console.log(queryKey, queryValue);
  const response = await gameAPI.get(`/characters/single?${queryKey}=${queryValue}`);
  console.log(response.data);
  return response.data;
};

export const attackCharacter = async (characterName) => {
  const response = await gameAPI.post(`/battle/attack/${characterName}`);
  return response.data;
}

export const getBattleLog = async () => {
  const response = await gameAPI.get(`/battle/log`);
  return response.data;
}

export const getAllItems = async () => {
  const response = await gameAPI.get("/shop");
  return response.data;
}

export const getSingleItem = async (itemId) => {
  const response = await gameAPI.get(`/shop/${itemId}`);
  return response.data;
}

export const buyItem = async (itemId) => {
  const response = await gameAPI.patch(`/shop/${itemId}/purchase`);
  return response.data;
}