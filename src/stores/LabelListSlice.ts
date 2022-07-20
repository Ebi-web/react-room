import { createSlice } from '@reduxjs/toolkit'
import { Label } from '../types/Task'

export interface LabelListState {
  labelList: Label[]
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
    labelListAddLabel({ labelList }: LabelListState, { payload }: LabelAdd) {
      const newLabelList = [...labelList, payload]
      return {
        labelList: newLabelList,
      }
    },
  },
})

export const { labelListAddLabel } = labelListSlice.actions
