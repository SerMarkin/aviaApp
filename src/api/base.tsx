
import axios, { AxiosRequestConfig } from "axios"
const BASE_URL = "http://82.146.53.60"

export function post(url:string,data?:any,config?:AxiosRequestConfig|undefined){
    return axios.post(BASE_URL + "/" + url,data,config)
}

export function get(url:string,config?:AxiosRequestConfig|undefined){
    return axios.get(BASE_URL + "/" + url,config)
}