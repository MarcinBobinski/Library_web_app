import React from "react";
import {action, makeObservable, observable, runInAction} from "mobx";
import {fetchCredentials} from "../api/auth/FetchCredentials";
import {registerUser} from "../api/auth/Register";

interface AuthCredentials {
  token: string
  id: number
  username: string
  email: string
  roles: string[]
}

const localStorageCredentialsKey = "credentials"

export class AuthStore {
  credentials: AuthCredentials | null = null;

  constructor() {
    makeObservable(this, {
      credentials: observable,
      login: action,
      logout: action,
      registerUser: action,
      isAuthenticated: action,
      isAdmin: action
    });
    runInAction(()=>{
      const credentials = localStorage.getItem(localStorageCredentialsKey)
      if(credentials == null){
        this.credentials = null
      } else {
        this.credentials = JSON.parse(credentials)
      }
    })
  }

  async login(user: string, password: string): Promise<boolean> {
    try {
      await runInAction(async () => {
        const credentials = await fetchCredentials(user, password)
        this.credentials = {
          token: credentials.type + " " + credentials.token,
          id: credentials.id,
          username: credentials.username,
          email: credentials.email,
          roles: credentials.roles
        }
      })
      localStorage.setItem(localStorageCredentialsKey, JSON.stringify(this.credentials))
    } catch (e){}

    return Promise.resolve( this.credentials != null);
  }

  logout(): void{
    runInAction(()=>{
      this.credentials = null;
    })
    localStorage.removeItem(localStorageCredentialsKey)
  }

  async registerUser(username: string, email: string, password: string): Promise<void> {
       await registerUser(username, email, password);
       await this.login(username, password)
  }

  isAuthenticated(): boolean {
    return this.credentials != null;
  }

  isAdmin(): boolean{
    return  ({...this.credentials}.roles || []).includes("ROLE_ADMIN");
  }
}