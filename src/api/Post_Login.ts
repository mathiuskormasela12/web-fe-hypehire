import { IResponse, IResponseWithParams } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { ILoginForm } from "@/app/login/types";
import { AxiosError } from "axios";
import IToken from "@/interfaces/IToken";


const postLogin = async (params: ILoginForm): Promise<IResponseWithParams<IToken>> => {
  try {
    const result = await apiBaseConfig.post<IResponseWithParams<IToken>>('/auth/login', {
      ...params
    })
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default postLogin