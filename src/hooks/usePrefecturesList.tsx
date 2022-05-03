import * as React from 'react'
import axios, { AxiosResponse } from 'axios'
import { ResasType } from '../@types/resas.d'

const baseURL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

export const usePrefecturesList = () => {
  const [post, setPost] = React.useState<ResasType.ResasResponse>(null!)
  React.useEffect(() => {
    const getApi = async () => {
      if (process.env.REACT_APP_RESAS_API_KEY === undefined) return
      const response: AxiosResponse<ResasType.ResasResponse> = await axios.get(
        baseURL,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
        }
      )
      return response
    }
    getApi()
      .then((response) => {
        if (response !== undefined) {
          setPost(() => response.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return post
}
