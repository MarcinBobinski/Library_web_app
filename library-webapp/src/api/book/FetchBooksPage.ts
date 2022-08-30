import {formatDate} from "../../common/FormatDate";
import axios from "axios";

type FetchBooksPageResponse = {
  currentPage: number
  pages: number
  books: BookResponse[]
}

type BookResponse = {
  id: number
  title: string
  description: string
  images: number[]
}

export const fetchBooksPage = async (page: number, limit: number): Promise<FetchBooksPageResponse> => {
  try {
    const response = await axios.get("/api/book/books", {
      params:{ page: page, limit: limit},
      headers:{Accept: "application/json"}
    })
    const responseData: FetchBooksPageResponse = await response.data
    return Object.assign(responseData, {fetchedAt: formatDate(new Date())})
  } catch (e){
    return Promise.reject(new Error("Failed to fetch books page"))
  }
}