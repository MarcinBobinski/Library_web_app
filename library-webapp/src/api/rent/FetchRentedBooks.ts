import axios from "axios";
import {formatDate} from "../../common/FormatDate";

export type Rents = {
  id: number
  bookId: number
  bookTitle: string
  rentedAt: string
  expectedReturnAt: string
  returnedAt: string | null
}

export const fetchRents = async (token: string): Promise<Rents[] | "unauthorized"> => {
  try {
    const response = await axios.get(`/api/user-rents`, {
      params:{},
      headers:{Accept: "application/json", Authorization: token}
    })
    const responseData: Rents[] = await response.data
    return Object.assign(responseData, {fetchedAt: formatDate(new Date())})
  } catch (e){
    if (axios.isAxiosError(e)) {
      if (e.response!.status === 401) {
        return Object.assign("unauthorized", {fetchedAt: formatDate(new Date())})
      }
    }
    return Promise.reject(new Error(`Failed to fetch rented books.`))
  }
}