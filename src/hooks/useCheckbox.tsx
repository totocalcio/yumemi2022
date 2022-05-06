import * as React from 'react'

type CheckedState = {
  prefCode: number
  prefName: string
  checked?: boolean | undefined
}[]

export const useCheckbox = (
  updateItem: () => void,
  checkedState: CheckedState,
  position: number,
  isChecked: boolean | undefined
) => {
  React.useEffect(() => {
    updateItem()
    //[todo]全体的にuseEffectの第二引数って何を設定すればよいか理解が浅い
  }, [isChecked])
  // updateItem()
  return checkedState[position]
}
