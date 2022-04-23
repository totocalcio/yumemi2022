import * as React from 'react'

type Props = {
  title: string
}

export const Header: React.FC<Props> = (props) => {
  return <h1>{props.title}</h1>
}
