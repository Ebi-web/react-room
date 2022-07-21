import { createSlice } from '@reduxjs/toolkit'
import type { SettingState } from '../types/SettingType'

interface SetSetting {
  payload: SettingState
}

export const settingSlice = createSlice({
  name: 'Setting',
  initialState: {
    sortKeyType: 'none',
    sortPriorityLabelIdList: [],
  } as SettingState,
  reducers: {
    setSetting(_: SettingState, { payload }: SetSetting) {
      return {
        sortKeyType: payload.sortKeyType,
        sortPriorityLabelIdList: payload.sortPriorityLabelIdList,
      }
    },
  },
})

export const { setSetting } = settingSlice.actions
