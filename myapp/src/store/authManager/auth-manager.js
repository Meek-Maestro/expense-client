import { makeAutoObservable } from "mobx";
import { authRepository } from "./auth";

class AuthManager {
  status = "initial";
  user = {};
  constructor() {
    makeAutoObservable(this);
  }
  setAuthenticatedProfile() {
    this.status = "loading";
  }
  loadAuthenticatedProfile() {
    this.status = "loading";
    const { user } = authRepository.getAuthenticatedProfile();
    if (user) {
      this.status = "authenticated";
      this.user = user;
    } else {
      this.status = "initial";
      this.setAuthenticatedProfile();
    }
  }
}

export const authManager = new AuthManager();
