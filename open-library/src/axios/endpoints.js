import server from "./instance";

export const registerUser = async (data) => await server.post("/accounts/register", data);
export const loginUser = async (data) => await server.post("/accounts/login", data);