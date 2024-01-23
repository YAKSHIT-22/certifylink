import axios from "axios";

export const publicApi = axios.create({
  baseURL: "https://certifylink.vercel.app",
  withCredentials: true,
});
// export const publicApi = axios.create({
//   baseURL: "http://localhost:4000",
//   withCredentials: true,
// });
