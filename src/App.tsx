import axios, { AxiosResponse, AxiosError } from 'axios'
import * as React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Prefectures } from './components/Prefectures'

const baseURL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'

type ResasResponse = {
  statusCode: string
  description: string
  message: string | null
  result: {
    prefCode: number
    prefName: string
  }[]
}

const App: React.FC = () => {
  const [post, setPost] = React.useState<ResasResponse>(null!)
  const [error, setError] = React.useState<AxiosError>(null!)
  React.useEffect(() => {
    if (process.env.REACT_APP_RESAS_API_KEY) {
      axios
        .get(baseURL, {
          headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((result: AxiosResponse<ResasResponse>) => {
          setPost(result.data)
        })
        .catch((error: AxiosError<{ error: string }>) => {
          setError(error)
        })
    }
  }, [])

  if (post) {
    return (
      <div className="App">
        <Header title="Title" />
        <h2>都道府県</h2>
        <Prefectures prefectures={post.result} />
      </div>
    )
  }

  if (error) return <>Error: {error}</>

  return <div>Loading...</div>
}

export default App
