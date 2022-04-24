import axios, { AxiosResponse, AxiosError } from 'axios'
import * as React from 'react'
import styled from 'styled-components'

interface ResasResponse {
  statusCode: string
  description: string
  message: string | null
  result: {
    prefCode: number
    prefName: string
  }[]
}

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
    checked?: boolean
  }[]
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`

const getPopulationURL =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'

export const Prefectures: React.FC<Props> = (props) => {
  const [post, setPost] = React.useState<ResasResponse>(null!)
  const [error, setError] = React.useState<AxiosError>(null!)
  const getApi = (id: number) => {
    console.log(1)
    if (process.env.REACT_APP_RESAS_API_KEY) {
      console.log(`${getPopulationURL}?cityCode=-&prefCode=${id}`)
      axios
        .get(
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=11',
          {
            headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
          }
        )
        .then((result: AxiosResponse<ResasResponse>) => {
          setPost(result.data)
        })
        .catch((error: AxiosError<{ error: string }>) => {
          setError(error)
        })
    }
    if (error) {
      console.log(error)
    } else {
      console.log(post)
    }
  }

  const [checkedState, setCheckedState] = React.useState(props.prefectures)

  const handleCheckedState = (position: number) => {
    getApi(position)
    const updateItem = (index: number) => {
      checkedState[index].checked = !checkedState[index].checked
      return checkedState[index]
    }
    setCheckedState(
      checkedState.map((item, index) =>
        index === position ? updateItem(index) : item
      )
    )
  }

  const mapList = props.prefectures.map((item, index) => (
    <li key={index}>
      <input
        type="checkbox"
        id={item.prefName}
        name="name"
        value={item.prefCode}
        checked={checkedState[index].checked}
        onChange={() => handleCheckedState(index)}
      />
      <label htmlFor={item.prefName}>{item.prefName}</label>
    </li>
  ))

  return <List>{mapList}</List>
}
