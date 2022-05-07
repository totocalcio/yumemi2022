import * as React from 'react'
import './App.css'
import { Header } from './components/Header'
import { Prefectures } from './components/Prefectures'
import { usePrefecturesList } from './hooks/usePrefecturesList'
import { Title } from './components/Subtitle'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`

const App: React.FC = () => {
  const post = usePrefecturesList()

  if (post) {
    return (
      <div className="App">
        <Header title="Title" />
        <Container>
          <Title title="都道府県" />
          <Prefectures prefectures={post.result} />
        </Container>
      </div>
    )
  }

  return <div>Loading...</div>
}

export default App
