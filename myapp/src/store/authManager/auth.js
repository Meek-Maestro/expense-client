import { makeAutoObservable } from "mobx";
import api from "../../api/api";

class AuthRepository {
  user = undefined;
  constructor() {
    makeAutoObservable(this);
    const user = localStorage.getItem("user");
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  async setAuthenticatedUser(token) {
    if (!token) throw Error("Cannot authenticate user");
    localStorage.setItem("token", token);
    if (!this.user) {
      const resp = await api.get("/profile");
      if (resp.data.user) {
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        this.user = resp.data.user;
        return { user: this.user };
      }
      return undefined;
    }
    return null;
  }

  async getAuthenticatedProfile() {
    if (this.user) {
      return { user: this.user };
    }
    const token = localStorage.getItem("token");
    if (token) {
      await this.setAuthenticatedUser(token);
    }
  }

  clear() {
    localStorage.clear();
  }
}

export const authRepository = new AuthRepository();
