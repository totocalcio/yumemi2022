import axios, { AxiosResponse, AxiosError } from 'axios'
import * as React from 'react'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

type Response<T> = {
  statusCode: string
  description: string
  message: string | null
  result: T
}

type Result = {
  boundaryYear: number
  data: {
    label: string
    data: {
      year: number
      value: number
      rate?: number
    }[]
  }[]
}

type Population = Response<Result>

type Props = {
  prefectures: {
    prefCode: number
    prefName: string
    checked?: boolean
  }[]
}

type Series = {
  type: 'line'
  name: string
  data: number[]
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`

const getPopulationURL =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'

export const Prefectures: React.FC<Props> = (props) => {
  const [post, setPost] = React.useState<Population>(null!)
  const [checkedState, setCheckedState] = React.useState(props.prefectures)
  const [series, setSeries] = React.useState<Series[]>([])
  const [position, setPosition] = React.useState(0)
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null)

  const categories = ['1970', '1980', '1990', '2000', '2010', '2020']

  const options: Highcharts.Options = {
    title: {
      text: '総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series,
  }

  React.useEffect(() => {
    if (checkedState[position].checked === true) {
      setSeries(() => [...series, dataset(checkedState[position].prefName)])
    } else {
      setSeries(() =>
        series.filter((item) => item.name !== checkedState[position].prefName)
      )
    }
  }, [post])

  const data = () => {
    const filterArr = post.result.data.find((elm) => elm.label === '総人口')
    if (!filterArr) return []
    const tempArr = filterArr.data.filter(
      (elm) =>
        Number(categories[0]) <= elm.year &&
        elm.year <= Number(categories[categories.length - 1]) &&
        elm.year.toString().slice(-1) === '0'
    )
    return tempArr.map((elm) => elm.value)
  }

  const dataset = (name: string): Series => ({
    type: 'line',
    name,
    data: data(),
  })

  const getApi = (prefCode: number) => {
    if (process.env.REACT_APP_RESAS_API_KEY) {
      axios
        .get(`${getPopulationURL}?cityCode=-&prefCode=${prefCode}`, {
          headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((result: AxiosResponse<Population>) => {
          setPost(result.data)
        })
        .catch((error: AxiosError<{ error: string }>) => {
          console.error(error)
        })
    }
  }

  const handleCheckedState = (position: number, prefCode: number) => {
    setPosition(position)
    getApi(prefCode)

    //checkボックス更新処理
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
        id={item.prefCode.toString()}
        name="name"
        value={item.prefCode}
        checked={checkedState[index].checked}
        onChange={() => handleCheckedState(index, item.prefCode)}
      />
      <label htmlFor={item.prefCode.toString()}>{item.prefName}</label>
    </li>
  ))

  return (
    <>
      <List>{mapList}</List>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...props}
      />
    </>
  )
}
