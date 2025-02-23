import axios from "axios";
import { URL } from "./constants";

export const postData = async (data: object): Promise<object[]> => {
  const response = await axios.post(URL, data);

  return response.data;
};

export const postImage = async (data: object) => {
  const reponse = await axios.post(URL, data);
  return reponse.data;
};

export const postRegistration = async (tripDateId: number, user) => {
  try {
    const response = await axios.post(
      `${URL}/api/trips/${tripDateId}/register`,
      {},
      {
        auth: {
          username: user.username,
          password: user.password,
        },
      }
    );
    console.log(response);
    return { data: response.data, ok: true };
  } catch (error) {
    return { ok: false };
  }
};
