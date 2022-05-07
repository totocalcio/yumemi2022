import axios, { AxiosResponse, AxiosError } from 'axios'
import * as React from 'react'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSeriesItem } from '../hooks/useSeriesItem'
import { CATEGORIES } from '../utils/constant'
import { ResasType } from '../@types/resas.d'
import { HighchartsType } from '../@types/highcharts.d'

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

const populationURL =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'

export const Prefectures: React.FC<Props> = (props) => {
  const [post, setPost] = React.useState<ResasType.Population>(null!)
  const [checkedState, setCheckedState] = React.useState(props.prefectures)
  const [series, setSeries] = React.useState<HighchartsType.Series[]>([])
  const [positionState, setPositionState] = React.useState<number | null>(null)
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null)

  //checkbox更新処理
  const updateCheckbox = (position: number) => {
    const toggleChecked = (index: number) => {
      checkedState[index].checked = !checkedState[index].checked
      return checkedState[index]
    }
    return checkedState.map((item, index: number) =>
      index === position ? toggleChecked(index) : item
    )
  }

  const seriesItem = useSeriesItem(post)

  const options: Highcharts.Options = {
    title: {
      text: '総人口推移',
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: CATEGORIES,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series,
  }

  React.useEffect(() => {
    console.log(positionState)
    //初回実行時は処理を終了する
    if (positionState == null) return
    if (checkedState[positionState].checked === true) {
      setSeries(() => [
        ...series,
        seriesItem(checkedState[positionState].prefName),
      ])
      console.log(1, series)
    } else {
      //[todo]series.filterが想定した動きではない
      //どこかでseriesの中身が書き換わっているがsetSeriesを行っている場所がなく不明
      // console.log(series)
      console.log(2, series)
      const filterSeries = series.filter(
        (item) => item.name !== checkedState[positionState].prefName
      )
      setSeries(() => filterSeries)
    }
    //[todo]warningエラーが出ている
  }, [post])

  const getApi = (prefCode: number) => {
    if (process.env.REACT_APP_RESAS_API_KEY) {
      axios
        .get(`${populationURL}?cityCode=-&prefCode=${prefCode}`, {
          headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY },
        })
        .then((result: AxiosResponse<ResasType.Population>) => {
          setPost(result.data)
        })
        .catch((error: AxiosError<{ error: string }>) => {
          console.error(error)
        })
    }
  }

  const handleCheckedState = (position: number, prefCode: number) => {
    setPositionState(position)
    getApi(prefCode)
    const updateCheckedState = updateCheckbox(position)
    setCheckedState(() => updateCheckedState)
    //[todo]なぜコールバック関数でそのまま値を設定するとだめなのか
    // setCheckedState(() => updateCheckbox(position))
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
