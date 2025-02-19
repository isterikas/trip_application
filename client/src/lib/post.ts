import axios from "axios";
import { URL } from "./constants";

export const postData = async (data): Promise<object[]> => {
  const response = await axios.post(URL, data);

  return response.data;
};

export const postImage = async (data) => {
  const reponse = await axios.post(URL, data);
  return reponse.data;
};
