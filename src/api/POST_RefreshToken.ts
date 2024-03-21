import { IResponseWithParams } from "@/interfaces/IResponse";
import apiBaseConfig from "./apiBaseConfig";
import IToken from "@/interfaces/IToken";

const postRefreshToken = async (refreshToken: string): Promise<IResponseWithParams<IToken>> => {
  try {
    const result = await apiBaseConfig.post('/auth/token', {
      refreshToken
    })

    return result.data
  } catch (err) {
    throw err
  }
}

export default postRefreshToken