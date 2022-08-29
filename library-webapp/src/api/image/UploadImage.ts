import axios from "axios";
import {formatDate} from "../../common/FormatDate";

export const uploadImage = async (file: Uint8Array, token: string): Promise<number | "unauthorized"> => {
  try {
    const response = await axios.post("/api/image/upload",
      {
        content: Array.from(file)
      },
      {
        params: {},
        headers: {"Content-Type": "application/json", Authorization: token},
      })
    const responseData: number = await response.data
    return Object.assign(responseData, {fetchedAt: formatDate(new Date())})
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response!.status === 401) {
        return Object.assign("unauthorized", {fetchedAt: formatDate(new Date())})
      }
    }
    return Promise.reject(new Error("Failed to upload image"))
  }
}