import * as React from 'react'
import { Prefectures } from './Prefectures'

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
    checked?: boolean
  }[]
}

export const Form: React.FC<Props> = (props) => {
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const distPrefectures = props.prefectures.map((item) => {
    item['checked'] = false
    return item
  })

  return (
    <form method="post">
      <Prefectures prefectures={distPrefectures} />
      <button type="button" onClick={handleSubmit}>
        送信
      </button>
    </form>
  )
}
