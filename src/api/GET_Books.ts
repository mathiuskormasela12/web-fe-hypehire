import { IResponse, IResponseWithParams } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { AxiosError } from "axios";

export interface ITag {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface IBookTag {
  id: string
  bookId: string
  tagId: string
  tag: ITag
}

export interface IBook {
  id: string
  title: string
  writer: string
  image: string
  price: number
  createdAt: string
  updatedAt: string
  bookTag: IBookTag[]
}

export interface IGetBooksRequest {
  keyword: string
}

const getBooks = async (params: IGetBooksRequest): Promise<IResponseWithParams<IBook[]>> => {
  try {
    const result = await apiBaseConfig.get('/books', {
      params: {
        ...params
      }
    })
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default getBooks