import { IResponse } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { AxiosError } from "axios";

export interface IPostOrderRequest {
  status: string
  bookId: string
}

const updateOrderStatus = async (params: IPostOrderRequest): Promise<IResponse> => {
  try {
    const result = await apiBaseConfig.post('/order', params)
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default updateOrderStatus