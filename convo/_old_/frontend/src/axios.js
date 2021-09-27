import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1323"
});

export default instance;
