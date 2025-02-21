import axios from "axios";
import { URL } from "./constants";

export const putData = async (id : number, data: object) => {
  const response = await axios.put(`${URL}/${id}`, data);
  return response.data;
};

export const patchData = async (id : number, data : object) => {
  const response = await axios.patch(`${URL}/${id}`, data);
  return response.data;
};
