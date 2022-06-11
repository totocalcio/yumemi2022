export namespace ResasType {
  export type ErrorResponse = {
    statusCode: string
    description: string
    message: string
  }

  export type ResasResponse = {
    message: string | null
    result: {
      prefCode: number
      prefName: string
    }[]
    statusCode: string
    description: string
  }

  //[todo]うまく合併型を使いたい
  export type ResponseData = {
    message: null
    result: {
      prefCode: number
      prefName: string
    }[]
  }
  export type ResasResponseUnion = ResponseData | ErrorResponse
  //　　ここまで

  export type Response<T> = {
    statusCode: string
    description: string
    message: string | null
    result: T
  }

  export type Result = {
    boundaryYear: number
    data: {
      label: string
      data: {
        year: number
        value: number
        rate?: number
      }[]
    }[]
  }

  export type Population = Response<Result>
}
