import { httpService } from "../http-service";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface User {
  name: string;
  email: string;
  password: string;
}
export interface LoginParams {
  email: string;
  password: string;
}

export interface CreateAccountParams extends LoginParams {
  name: string;
  email: string;
  password: string;
}

export const AUTH_TOKEN_KEY = "authToken";

class AuthService {
  constructor() {
    httpService.setAuthToken(this.getAuthToken());
  }

  getAuthToken() {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  }
  getUserFromToken() {
    const token = this.getAuthToken();
    if (!token) return null;
    const tokenData = jwtDecode<{ user: User } & JwtPayload>(token);
    console.log(tokenData);
    if (!tokenData.exp) {
      return null;
    }
    // if (tokenData.exp * 1000 > Date.now()) {
    //   console.log("Token is expired");
    //   return null;
    // }
    return tokenData.user;
  }
  setAuthToken(token: string | null) {
    if (token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    httpService.setAuthToken(token);
  }
  async login(data: LoginParams) {
    const res = await httpService.post<{ token: string }>("auth/login", data);
    this.setAuthToken(res.data.token);
    return this.getUserFromToken();
  }

  async createAccount(data: CreateAccountParams) {
    const res = await httpService.post<{ token: string }>(
      "auth/register",
      data,
    );
    this.setAuthToken(res.data.token);
    return this.getUserFromToken();
  }
}

export const authService = new AuthService();
