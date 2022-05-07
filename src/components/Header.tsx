import * as React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
}

const Title = styled.h1`
  background: #eee;
  margin: 0;
  padding: 1em;
`

export const Header: React.FC<Props> = (props) => {
  return <Title>{props.title}</Title>
}
