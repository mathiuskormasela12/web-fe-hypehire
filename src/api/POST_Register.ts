import { IResponse } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import { IRegisterForm } from "@/app/register/types";
import { AxiosError } from "axios";


const postRegister = async (params: IRegisterForm): Promise<IResponse> => {
  try {
    const result = await apiBaseConfig.post<IResponse>('/auth/register', {
      ...params
    })
    return result.data
  } catch (err) {
    const error = err as AxiosError<IResponse>
    throw error?.response?.data
  }
}

export default postRegister