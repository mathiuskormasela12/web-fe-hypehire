import { IResponse, IResponseWithParams } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { AxiosError } from "axios";
import { IBook } from "./GET_Books";

export interface IOrder {
  id: string
  status: string
  userId: string
  bookId: string
  createdAt: string
  updatedAt: string
  book: IBook
}

export interface IGetOrderListsRequest {
  status: string
}

const getOrderLists = async (params: IGetOrderListsRequest): Promise<IResponseWithParams<IOrder[]>> => {
  try {
    const result = await apiBaseConfig.get('/order/' + params.status)
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default getOrderLists