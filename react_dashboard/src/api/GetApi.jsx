import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:5000",
});


//post method

export const postData = (storeInput) =>{

    return api.post("/errors",storeInput);
};



export const getData = (language) =>{

    return api.get(`/errors/:${language}`);
}