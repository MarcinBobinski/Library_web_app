import {makeAutoObservable, runInAction} from "mobx";
import {fetchCredentials} from "../api/Auth/FetchCredentials";
import {showNotification} from "@mantine/notifications";

interface AuthCredentials {
  token: string
  id: number
  username: string
  email: string
  roles: string[]
}

export class AuthStore {
  credentials: AuthCredentials | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async login(user: string, password: string): Promise<void> {
    try {
      const credentials = await fetchCredentials(user, password)
      await runInAction(() => {
        this.credentials = {
          token: credentials.type + " " + credentials.token,
          id: credentials.id,
          username: credentials.username,
          email: credentials.email,
          roles: credentials.roles
        }
      })
    } catch (e){
      showNotification({
        title: 'Login Error',
        message: 'There was an error',
        color: 'red',
        autoClose: 5000
      })
    }
  }

  async logout(): Promise<void>{
    runInAction(()=>{
      this.credentials = null;
    })
  }

  isAuthenticated(): boolean {
    return this.credentials != null;
  }
}