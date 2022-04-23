import * as React from 'react'
import styled from 'styled-components'

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
  }[]
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`

export const Prefectures: React.FC<Props> = (props) => {
  const [checkedState, setCheckedState] = React.useState<boolean[]>(
    Array(props.prefectures.length).fill(false)
  )

  const handleCheckedState = (position: number) => {
    setCheckedState(
      checkedState.map((item, index) => (index === position ? !item : item))
    )
  }

  const mapList = props.prefectures.map((item, index) => (
    <li key={index}>
      <input
        type="checkbox"
        id={item.prefName}
        name="name"
        value={item.prefCode}
        checked={checkedState[index]}
        onChange={() => handleCheckedState(index)}
      />
      <label htmlFor={item.prefName}>{item.prefName}</label>
    </li>
  ))

  return <List>{mapList}</List>
}
