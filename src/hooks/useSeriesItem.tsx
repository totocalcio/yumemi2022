import { CATEGORIES } from '../utils/constant'
import { Resas } from '../@types/resas.d'

type Series = {
  type: 'line'
  name: string
  data: number[]
}

export const useSeriesItem = (post: Resas.Population) => {
  const data = () => {
    const filterArr = post.result.data.find((elm) => elm.label === '総人口')
    if (!filterArr) return []
    const tempArr = filterArr.data.filter(
      (elm) =>
        Number(CATEGORIES[0]) <= elm.year &&
        elm.year <= Number(CATEGORIES[CATEGORIES.length - 1]) &&
        elm.year.toString().slice(-1) === '0'
    )
    return tempArr.map((elm) => elm.value)
  }

  const seriesItem = (name: string): Series => ({
    type: 'line',
    name,
    data: data(),
  })
  return seriesItem
}
