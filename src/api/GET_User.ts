import { IResponse, IResponseWithParams } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { AxiosError } from "axios";

export interface IUser {
  id: string
  email: string
  password: string
  point: number
  createdAt: string
  updatedAt: string
}

const getUser = async (): Promise<IResponseWithParams<IUser>> => {
  try {
    const result = await apiBaseConfig.get('/auth/user')
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default getUser