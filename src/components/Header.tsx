import * as React from "react";

type Props = {
  title: string;
};

const Component: React.FC<Props> = (props) => {
  return <h1>{props.title}</h1>;
};

export default Component;
