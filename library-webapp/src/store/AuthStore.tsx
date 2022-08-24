import React from "react";
import {makeAutoObservable, runInAction} from "mobx";
import {fetchCredentials} from "../api/Auth/FetchCredentials";
import {registerUser} from "../api/Auth/Register";

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
    makeAutoObservable(this);
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

  async logout(): Promise<void>{
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
}