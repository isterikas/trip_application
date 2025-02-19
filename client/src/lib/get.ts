import axios from "axios";

export const getAllData = async (resource?: string) => {
  const response = await axios.get(`${URL}/${resource}`);
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};
