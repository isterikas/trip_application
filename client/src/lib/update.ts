import axios from "axios";
import { URL } from "./constants";

export const putData = async (id: number, data: object) => {
  const response = await axios.put(`${URL}/${id}`, data);
  return response.data;
};

export const updateStatus = async (id: number, status: string) => {
  const payload = { status };
  const response = await axios.patch(`${URL}/api/trips/${id}/review`, payload);
  return response.data;
};
