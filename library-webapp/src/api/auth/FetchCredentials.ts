import {formatDate} from "../../common/FormatDate";

type CredentialsResponse = {
  token: string
  type: string
  id: number
  username: string
  email: string
  roles: string[]
}

export const fetchCredentials = async (username: string, password: string): Promise<CredentialsResponse> => {
  const response = await fetch("/api/auth/signin", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username,
      password: password
    })
  })

  if(response.ok){
    const credentials: CredentialsResponse = await response.json()
    return Object.assign(credentials, {fetchedAt: formatDate(new Date())})
  } else {
    return Promise.reject(new Error("Failed to fetch credentials for user: " + username))
  }
}