import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// api interceptors-this code sends the token to server ,to getting from saves the browser
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("Token attached:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
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

export const postSignupData = (signupForm) => {
  return api.post("/signup", signupForm);
};
//login post method

export const postLoginData = (loginForm) => {
  return api.post("/login", loginForm);
};

// //store token

// export const getTokenData = () => {
//   return api.get("/profile");
// };
