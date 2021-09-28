import Token from '../helpers/token.service'

const BASE_URL = process.env.ROOT_API;
const API_VERSION = process.env.API_VERSION;

export const API = {
    get : async (url) => fetch(BASE_URL+API_VERSION+url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token.getToken()
        }
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        if(response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
    }).then(respo => { 
        return respo;
    }).catch(error => {
        return error;
    }),

    post : async (url, body) => fetch(BASE_URL+API_VERSION+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token.getToken(),
        },
        body: JSON.stringify(body)
    }).then(response => {
        return response.json();
    }).catch(error => {
        return error;
    }),

    put : async (url, body) => fetch(BASE_URL+API_VERSION+url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token.getToken(),
        },
        body: JSON.stringify(body)
    }).then(response => {
        if (response.ok){
            return response.json();
        }
    }).catch(error => {
        return error;
    }),

    delete : async (url, body = null) => fetch(BASE_URL+API_VERSION+url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Token.getToken()
        },        
        body: JSON.stringify(body)
    }).then(response => {
        if(response.ok){
            return response.json();
        }
        if(response.status == 401){
            localStorage.clear();
            window.location.reload();
        }
    }).then(respo => { 
        return respo;
    }).catch(error => {
        return error;
    }),
};