import axios from "axios";

const gameAPI = axios.create({
  baseURL: "toBeDetermined",
});

export const postAccount = async (postedAccount) => {
  console.log(postedAccount);
  const response = await gameAPI.post("/signup", postedAccount);
  return response.data;
};
