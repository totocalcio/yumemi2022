import * as React from 'react'
import styled from 'styled-components'

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

export const Prefectures: React.FC<Props> = (props) => {
  const [checkedState, setCheckedState] = React.useState(props.prefectures)

  const handleCheckedState = (position: number) => {
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
