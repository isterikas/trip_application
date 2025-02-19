import axios from "axios";

export const putData = async (id, data: object) => {
  const response = await axios.put(`${URL}/${id}`, data);
  return response.data;
};

export const patchData = async (id, data) => {
  const response = await axios.patch(`${url}/${id}`, data);
  return response.data;
};
