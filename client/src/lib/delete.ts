import axios from "axios";
import { URL } from "./constants";

export const deleteData = async (id:number) => {
  await axios.delete(`${URL}/${id}`);
};
