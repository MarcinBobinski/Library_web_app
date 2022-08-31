import axios from "axios";
import {formatDate} from "../../common/FormatDate";

type BookByTextResponse = {
  id: number
  title: string
}

export const findBooksByText = async (text: string): Promise<BookByTextResponse[]> => {
  try {
    const response = await axios.post("/api/book/by-title-text",
      {
        text: text
      },
      {
        headers:{"Content-Type": "application/json"}
      })
    const responseData: BookByTextResponse[] = await response.data
    return Object.assign(responseData, {fetchedAt: formatDate(new Date())})
  }  catch (e) {
    return Object.assign([], {fetchedAt: formatDate(new Date())})
  }
}