import * as React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Prefectures } from './components/Prefectures'
import { usePrefecturesList } from './hooks/usePrefecturesList'

const App: React.FC = () => {
  const [post] = usePrefecturesList()

  if (post) {
    return (
      <div className="App">
        <Header title="Title" />
        <h2>都道府県</h2>
        <Prefectures prefectures={post.result} />
      </div>
    )
  }

  return <div>Loading...</div>
}

export default App
