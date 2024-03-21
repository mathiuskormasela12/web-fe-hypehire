import { IResponse } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { AxiosError } from "axios";

export interface IPutPayBookRequest {
  id: string
}

const payBook = async (params: IPutPayBookRequest): Promise<IResponse> => {
  try {
    const result = await apiBaseConfig.put('/order/' + params.id)
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default payBook