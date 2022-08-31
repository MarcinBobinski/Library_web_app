import axios from "axios";
import {formatDate} from "../../common/FormatDate";

export const uploadBook = async (title: string, description: string, images: number[], token: string): Promise<void | "unauthorized"> => {
  try {
    await axios.post("/api/book/add",
      {
        title: title,
        description: description,
        images: images
      },
      {
      headers:{"Content-Type": "application/json", Authorization: token}
    })
  }  catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response!.status === 401) {
        return Object.assign("unauthorized", {fetchedAt: formatDate(new Date())})
      }
    }
    return Promise.reject(new Error("Failed to upload image"))
  }
}