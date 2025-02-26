import axios from "axios";
import { URL } from "./constants";

export const postData = async (data: object): Promise<object[]> => {
  const response = await axios.post(URL, data);

  return response.data;
};

export const postRegistration = async (tripDateId, user) => {
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
  console.log(response.data);
  return response.data;
};

export const postTrip = async (data) => {
  const response = await axios.post(`${URL}/api/trips`, data);

  return response.data;
};
