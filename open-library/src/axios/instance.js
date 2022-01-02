import axios from "axios";

const server = axios.create({
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    baseURL: "http://127.0.0.1:8000"
})

export default server;