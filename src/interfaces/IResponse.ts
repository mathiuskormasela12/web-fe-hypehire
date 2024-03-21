export interface IResponseWithParams<T> {
  statusCode: number
  message?: string
  data?: T
  errors?: string[]
}

export interface IResponse {
  statusCode: number
  message?: string
  errors?: string[]
}
