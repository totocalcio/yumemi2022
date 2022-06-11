import * as React from 'react'
import styled from 'styled-components'

//style
const Text = styled.h2`
  text-align: left;
  margin: 0;
  padding: 1em 2em;
  font-size: 1rem;
`

export const Title: React.FC<{ title: string }> = ({ title }) => {
  return <Text>{title}</Text>
}
