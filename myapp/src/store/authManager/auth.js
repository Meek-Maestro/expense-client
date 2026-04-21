import { makeAutoObservable } from "mobx";

class AuthRepository {
  user = null;
  constructor() {
    makeAutoObservable(this);
  }

  setAuthenticatedUser(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  getAuthenticatedProfile() {
    const user = localStorage.getItem("user");
    if (user) {
      this.user = user;
    }
    return { user };
  }

  clear() {
    localStorage.clear();
  }
}

export const authRepository = new AuthRepository();
