import axios, { AxiosRequestConfig } from "axios"

var BASE_URL = "https://developavia.tk";
// if (window.location.hostname==='localhost' && window.location.port==='8100') BASE_URL = "http://localhost:8000"
let token = localStorage.getItem("token") || "Bearer asdwqeas123"
axios.defaults.headers.common['Authorization'] = token
export function post(url:string,data?:any,config?:AxiosRequestConfig|undefined){
    return axios.post(BASE_URL + "/" + url,data,config)
}

export function get(url:string,config?:AxiosRequestConfig|undefined){
    return axios.get(BASE_URL + "/" + url,config)
}

export const BASE_API = BASE_URL;