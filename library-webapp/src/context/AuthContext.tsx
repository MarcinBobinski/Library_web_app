import React, {useContext} from "react";

export type AuthContent = {
  user: string | null,
  setUser: (user: string | null) => void
  token: string | null,
  setToken: (token: string | null) => void,
  roles: string[] | null
  setRoles: (roles: string[] | null) => void
}

export const AuthContext = React.createContext<AuthContent>({
  user: null,
  setUser: () => {
  },
  token: null,
  setToken: () => {
  },
  roles: null,
  setRoles: () => {
  }
})

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context == null) {
    // throw exception not in context
  }
  return context
}


