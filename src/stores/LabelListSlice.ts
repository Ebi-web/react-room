import { createSlice } from '@reduxjs/toolkit'
import { Label } from '../types/Task'
import { setLabelListToLocalStorage } from '../functions/localStorage'

export interface LabelListState {
  labelList: Label[]
}

export interface SetLabelList {
  payload: Label[]
}
export interface LabelAdd {
  payload: Label
}

export const labelListSlice = createSlice({
  name: 'labelList',
  initialState: {
    labelList: [],
  } as LabelListState,
  reducers: {
    setLabelList(_: LabelListState, { payload }: SetLabelList) {
      return {
        labelList: payload,
      }
    },
    labelListAddLabel({ labelList }: LabelListState, { payload }: LabelAdd) {
      const newLabelList = [...labelList, payload]
      setLabelListToLocalStorage(newLabelList)
      return {
        labelList: newLabelList,
      }
    },
  },
})

export const { labelListAddLabel, setLabelList } = labelListSlice.actions
