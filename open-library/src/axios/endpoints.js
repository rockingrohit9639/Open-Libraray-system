import server from "./instance";

export const registerUser = async (data) => await server.post("/accounts/register", data);