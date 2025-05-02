import axios from "axios";

export const fetchAgent = axios.create({
    baseURL: "https://frontend-take-home-service.fetch.com",
    withCredentials: true
})