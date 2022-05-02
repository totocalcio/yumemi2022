import * as React from 'react'
import axios, { AxiosResponse } from 'axios'

const baseURL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

type Response = {
  message: null
  result: {
    prefCode: number
    prefName: string
  }[]
}

type ErrorResponse = {
  statusCode: string
  description: string
  message: string
}

type ResasResponse = {
  message: string | null
  result: {
    prefCode: number
    prefName: string
  }[]
  statusCode: string
  description: string
}

//[todo]うまく使いたい
type ResasResponseUnion = Response | ErrorResponse

export const usePrefecturesList = () => {
  const [post, setPost] = React.useState<ResasResponse>(null!)
  React.useEffect(() => {
    const getApi = async () => {
      //[todo]第２引数に何を設定すればいいのかわからない
      let response: AxiosResponse<ResasResponse, any>
      if (process.env.REACT_APP_RESAS_API_KEY) {
        response = await axios.get(baseURL, {
          headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
        })
        setPost(response.data)
      }
    }
    getApi().catch((error) => {
      console.error(error)
    })
  }, [])
  return [post]
}
