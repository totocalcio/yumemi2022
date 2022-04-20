import axios from "axios";
import * as React from "react";
import "./App.css";
import Header from "./components/Header";

const baseURL = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

interface ResasResponse {
  statusCode: string;
  description: string;
  message: string | null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
}

const App: React.FC = () => {
  const [post, setPost] = React.useState<ResasResponse>(null!);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (process.env.REACT_APP_RESAS_API_KEY) {
      axios
        .get(baseURL, {
          headers: { "X-API-KEY": process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((result) => {
          setPost(result.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, []);

  if (post) {
    const mapAry = post.result.map((item) => item.prefName);
    console.log(mapAry);
  }

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="App">
      <Header title="Title" />
    </div>
  );
};

export default App;
