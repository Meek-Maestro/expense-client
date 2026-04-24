import { makeAutoObservable, runInAction } from "mobx";
import { authRepository } from "./auth";

class AuthManager {
  status = "initial";
  profile = {};
  constructor() {
    makeAutoObservable(this);
  }

  setAuthenticatedProfile(token) {
    authRepository.setAuthenticatedUser(token);
    this.loadAuthenticatedProfile();
  }

  async loadAuthenticatedProfile() {
    runInAction(() => {
      this.status = "loading";
    });
    const payload = await authRepository.getAuthenticatedProfile();
    if (payload) {
      runInAction(() => {
        this.status = "authenticated";
        this.profile = payload?.user;
      });
    } else {
      runInAction(() => {
        this.status = "loaded";
        this.loadAuthenticatedProfile();
      });
    }
  }

  async init() {
    const payload = await authRepository.getAuthenticatedProfile();
    if (!payload) {
      runInAction(() => {
        this.status = "loaded";
      });
    } else {
      await this.loadAuthenticatedProfile();
    }
  }

  logout() {
    authRepository.clear()

    runInAction(()=>{
      this.status = "initial"
    })
  }
}

export const authManager = new AuthManager();
