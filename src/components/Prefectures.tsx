import * as React from 'react'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useSeriesItem } from '../hooks/useSeriesItem'
import { usePrefecturesData } from '../hooks/usePrefecturesData'
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

export const Prefectures: React.FC<Props> = (props) => {
  const [post, setPost] = React.useState<ResasType.Population>(null!)
  const [checkedState, setCheckedState] = React.useState(props.prefectures)
  const [series, setSeries] = React.useState<HighchartsType.Series[]>([])
  const [positionState, setPositionState] = React.useState(0)
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null)
  const seriesItem = useSeriesItem(post)
  const getApiData = usePrefecturesData(setPost)

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
    if (checkedState[positionState].checked === true) {
      setSeries(() => [
        ...series,
        seriesItem(checkedState[positionState].prefName),
      ])
    } else {
      //[todo]series.filterが想定した動きではない
      //どこかでseriesの中身が書き換わっているがsetSeriesを行っている場所がなく不明
      // console.log(series)
      setSeries(() =>
        series.filter(
          (item) => item.name !== checkedState[positionState].prefName
        )
      )
    }
  }, [post])

  const handleCheckedState = (position: number, prefCode: number) => {
    setPositionState(position)
    getApiData(prefCode)

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
