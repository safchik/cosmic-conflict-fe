import axios from "axios";

const gameAPI = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const createNewAccount = async (postedAccount) => {
  try {
    const response = await gameAPI.post("/auth/signup", postedAccount);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err.response;
  }
};

export const login = async (account) => {
  try {
    const response = await gameAPI.post("/login", account);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const logout = async () => {
  try {
    const response = await gameAPI.post("/logout");
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const getAllCharacters = async () => {
  try {
    const response = await gameAPI.get("/characters");
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const createNewCharacter = async (newCharacter) => {
  try {
    const response = await gameAPI.post("/characters", newCharacter);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const getUserCharacter = async (queryKey, queryValue) => {
  try {
    const response = await gameAPI.get(
      `/characters/single?${queryKey}=${queryValue}`
    );
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const attackCharacter = async (characterName) => {
  try {
    const response = await gameAPI.post(`/battle/attack/${characterName}`);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const getBattleLog = async () => {
  try {
    const response = await gameAPI.get(`/battle/log`);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const getAllItems = async () => {
  try {
    const response = await gameAPI.get("/shop");
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const getSingleItem = async (itemId) => {
  try {
    const response = await gameAPI.get(`/shop/${itemId}`);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};

export const buyItem = async (itemId) => {
  try {
    const response = await gameAPI.patch(`/shop/${itemId}/purchase`);
    return response.data;
  } catch (err) {
    throw err.response;
  }
};
