import axios from "axios";
import { getLocalStorage } from "./authorization";

const axiosInstance = axios.create({
  headers: { "Content-Type": "application/json" },
});

// const baseurl = "https://mern-stack-backend.vercel.app/api";
const baseurl = "http://localhost:8080";

export const api = async ({ method = "get", url = "", body = "" }) => {
  return await new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common["Authorization"] = getLocalStorage(
      "token"
    )
      ? `Bearer ${getLocalStorage("token")}`
      : "";
    // axiosInstance.defaults.withCredentials = true;
    // axiosInstance.defaults.credentials = "include";
    // axiosInstance.defaults.xsrfCookieName = "XSRF-TOKEN";
    axiosInstance[method](`${baseurl}${url}`, body ? body : "")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
