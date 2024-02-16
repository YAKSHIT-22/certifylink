import axios from "axios";

export const publicApi = axios.create({
  baseURL: "https://certifylink-api.onrender.com",
  withCredentials: true,
});
// export const publicApi = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// });
