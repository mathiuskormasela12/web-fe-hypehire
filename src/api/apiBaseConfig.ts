import axios from "axios";
import postRefreshToken from "./POST_RefreshToken";
import { store } from "@/store";
import { setToken } from "@/store/reducers/auth";

const apiBaseConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
})

apiBaseConfig.interceptors.request.use(config => {
  const accessToken = store.getState().authReducer.accessToken
  config.headers['x-access-token'] = accessToken

  return config
})

apiBaseConfig.interceptors.response.use(async (response) => {
  return response
}, (async err => {
  const originalConfig = err.config
  const responseCode = err?.response?.status

  if(responseCode === 403) {
    const refreshToken = store.getState().authReducer.refreshToken
    try {
      const responseRefreshToken = await postRefreshToken(refreshToken)

      if(responseRefreshToken.statusCode === 200) {
        store.dispatch(setToken({
          accessToken: responseRefreshToken.data?.accessToken!,
          refreshToken: responseRefreshToken.data?.refreshToken!
        }))
        return apiBaseConfig.request(originalConfig)
      } else {
        store.dispatch(setToken({
          accessToken: '',
          refreshToken: ''
        }))
        return Promise.reject(err);
      } 
    } catch (err) {
      store.dispatch(setToken({
        accessToken: '',
        refreshToken: ''
      }))
      return Promise.reject(err);
    }
  } else {
    return Promise.reject(err);
  }
}))

export default apiBaseConfig