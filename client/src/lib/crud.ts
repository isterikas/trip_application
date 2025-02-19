
import axios from "axios";
import {URL} from "./constants"



export const postData = async (data) : Promise<object[]> => {
  const response = await axios.post(URL, data);

  return response.data;
};

export const postImage = async (data) => {
  const reponse = await axios.post(URL, data);
  return reponse.data;
};

export const getAllData = async (resource : string) => {
    const response = await axios.get(`${URL}/${resource}`);
    return response.data;
  };
  
  export const getOne = async (id) => {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  };

  export const patchData = async (id, data : object) => {
    const response = await axios.patch(`${URL}/${id}`, data);
    return response.data;
  };
  
  export const putData = async (id, data : object) => {
    const response = await axios.put(`${URL}/${id}`, data);
    return response.data;
  };

  export const deleteData = async (id) => {
   await axios.delete(`${URL}/${id}`)
  }

