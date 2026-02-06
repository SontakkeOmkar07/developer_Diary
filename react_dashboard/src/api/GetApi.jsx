import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// api interceptors-this code sends the token to server ,to getting from saves the browser
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("Token attached:", token);
    if (!token) return config;
    if (config.url.includes("/signup")) return config;
    if (config.url.includes("/login")) return config;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => Promise.reject(err),
);

//post method

export const postData = (storeInput) => {
  return api.post("/errors", storeInput);
};

export const getData = (language) => {
  return api.get(`/errors/${language}`);
};

//delete method

export const deleteData = (id) => {
  return api.delete(`/errors/${id}`);
};

//errors count

export const getAllLanguageCount = () => {
  return api.get("/errors-count");
};

//signup post method

export const postSignupData = (data) => {
  return api.post("/signup", data);
};
//login post method

export const postLoginData = (data) => {
  return api.post("/login", data);
};

// //store token

// export const getTokenData = () => {
//   return api.get("/profile");
// };
