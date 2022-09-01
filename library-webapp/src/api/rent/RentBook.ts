import axios from "axios";
import {formatDate} from "../../common/FormatDate";

export const rentBook = async (bookId: number, token: string): Promise<void | "unauthorized"> => {
  try {
    await axios.post(`/api/rent/${bookId}`,
      {},
      {
        params: {},
        headers: {"Content-Type": "application/json", Authorization: token},
      })
    return;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response!.status === 401) {
        return Object.assign("unauthorized", {fetchedAt: formatDate(new Date())})
      }
    }
    return Promise.reject(new Error("Failed to rent a book"))
  }
}