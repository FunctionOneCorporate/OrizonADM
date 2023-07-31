import axios from "axios";
// na hora de buildar, trocar a variavel do .env pelo link do back no heroku
// https://animadex-backend.herokuapp.com/
export const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    // baseURL: "http://localhost:3000/",
});
