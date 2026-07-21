import * as authApi from "../api/authApi";

export const login = (data) => authApi.login(data);

export const register = (data) => authApi.register(data);