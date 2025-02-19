import axios from "axios";

export const deleteData = async (id) => {
  await axios.delete(`${URL}/${id}`);
};
