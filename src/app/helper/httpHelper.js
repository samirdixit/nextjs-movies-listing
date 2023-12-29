import axios from "axios";

// supportive function for handling the api calls

//for get method
export const get = (url, config) => {
  return axios.get(`${process.env.LOCAL_BASE_URL}/${url}`, config);
};

//for psot method
export const post = (url, config, payload) => {
  return axios.post(`${process.env.LOCAL_BASE_URL}/${url}`, config, payload);
};

//for patch method
export const patch = (url, config, payload) => {
  return axios.patch(`${process.env.LOCAL_BASE_URL}/${url}`, config, payload);
};
