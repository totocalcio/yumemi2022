import * as React from 'react'

type CheckedState = {
  prefCode: number
  prefName: string
  checked?: boolean | undefined
}[]

export const useCheckbox = (
  setCheckedState: React.Dispatch<React.SetStateAction<CheckedState>>,
  updateCheckedState: CheckedState,
  position: number
) => {
  React.useEffect(() => {
    setCheckedState(() => updateCheckedState)
    //[todo]全体的にuseEffectの第二引数って何を設定すればよいか理解が浅い
  }, [setCheckedState])
  // updateItem()
  return updateCheckedState[position]
}
