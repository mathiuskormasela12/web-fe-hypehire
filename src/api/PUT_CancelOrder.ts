import { IResponse } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { AxiosError } from "axios";

export interface IPutCancelOrderRequest {
  id: string
}

const cancelOrder = async (params: IPutCancelOrderRequest): Promise<IResponse> => {
  try {
    const result = await apiBaseConfig.put('/order/cancel/' + params.id)
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default cancelOrder