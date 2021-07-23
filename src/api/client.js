import axios from "axios";

const Client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json'
});

export default Client;