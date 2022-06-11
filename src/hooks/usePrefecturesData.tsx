import * as React from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { ResasType } from '../@types/resas.d'

const getPopulationURL =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'

//[todo]引数の型定義を外出し
export const usePrefecturesData = (
  setPost: React.Dispatch<React.SetStateAction<ResasType.Population>>
) => {
  const getApi = (prefCode: number) => {
    if (process.env.REACT_APP_RESAS_API_KEY) {
      axios
        .get(`${getPopulationURL}?cityCode=-&prefCode=${prefCode}`, {
          headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((result: AxiosResponse<ResasType.Population>) => {
          setPost(result.data)
        })
        .catch((error: AxiosError<{ error: string }>) => {
          console.error(error)
        })
    }
  }
  return getApi
}
