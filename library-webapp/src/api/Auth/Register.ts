import {formatDate} from "../../common/FormatDate";

type RegisterResponse = {
  message: string
}

export const registerUser = async (username: string, email: string, password: string): Promise<RegisterResponse> => {
  const response = await fetch("/api/auth/signup", {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  })

  try {
    const registerResponse: RegisterResponse = await response.json()
    if(response.ok){
      return Object.assign(registerResponse, {fetchedAt: formatDate(new Date())})
    } else {
      return Promise.reject(new Error(registerResponse.message))
    }
  } catch (e) {
    return Promise.reject(new Error("Failed to register user."))
  }
}