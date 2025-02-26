import axios from "axios";
import { URL } from "./constants";

export const deleteItemById = async (id: number) => {
  await axios.delete(`${URL}/api/trips/${id}`);
};
