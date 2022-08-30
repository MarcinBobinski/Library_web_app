import {formatDate} from "../../common/FormatDate";
import axios from "axios";

type BookResponse = {
  id: number
  title: string
  description: string
  images: number[]
}

export const fetchBookDetailed = async (id: number): Promise<BookResponse> => {
  try {
    const response = await axios.get(`/api/book/${id}`, {
      params:{},
      headers:{Accept: "application/json"}
    })
    const responseData: BookResponse = await response.data
    return Object.assign(responseData, {fetchedAt: formatDate(new Date())})
  } catch (e){
    return Promise.reject(new Error(`Failed to fetch books page with id: ${id.toString()}.`))
  }
}