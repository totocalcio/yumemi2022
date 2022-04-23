import * as React from 'react'
import { Prefectures } from './Prefectures'

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
  }[]
}

export const Form: React.FC<Props> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <form method="post">
      <Prefectures prefectures={props.prefectures} />
      <button type="button" onClick={handleSubmit}>
        送信
      </button>
    </form>
  )
}
