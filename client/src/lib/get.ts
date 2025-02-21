import axios from "axios";
import { URL } from "./constants";

export const getAllData = async (resource?: string) => {
  const response = await axios.get(`${URL}/${resource}`);
  return response.data;
};

export const getOne = async (id:number) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};
