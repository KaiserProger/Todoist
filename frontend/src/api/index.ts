import axios, { AxiosRequestConfig } from "axios";
export const host = axios.create({
    baseURL: 'http://localhost:8000',
});