import React, {useContext} from "react";

export interface Credentials {
  user: string,
  token: string,
  admin: boolean
}

export type AuthContent = {
  credentials: Credentials | null
  login: (username: string, password: string) => boolean
  logout: () => boolean
  register: (username: string, password: string) => boolean
}

export const AuthContext = React.createContext<AuthContent | null>(null)

interface AuthProviderProps {
  children?: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}: AuthProviderProps) => {
  const [credentials, setCredentials] = React.useState<Credentials | null>(null)

  const login = (username: string, password: string) => {
    throw new Error('Method not implemented.');
  }
  const logout = () => {
    throw new Error('Method not implemented.');
  }
  const register = (username: string, password: string) => {
    throw new Error('Method not implemented.');
  }

  return (
    <AuthContext.Provider value={{credentials, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context == null) {
    // throw exception not in context
  }
  return context
}


