import axios from "axios";

const backendUrl=import.meta.env.VITE_BACKEND_BASE_URL ||"https://gupshup-mychat-app.vercel.app/";
console.log("Base URL : ",backendUrl);
export const axiosInstance=axios.create({
    baseURL:backendUrl,
    withCredentials:true
})
