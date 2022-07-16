import { createSlice } from '@reduxjs/toolkit'
import type { SortKeyType } from '../types/SettingType'

export interface SettingState {
  sortKeyType: SortKeyType
}

interface SetSetting {
  payload: SettingState
}

export const settingSlice = createSlice({
  name: 'Setting',
  initialState: {
    sortKeyType: 'none',
  } as SettingState,
  reducers: {
    setSetting(_: SettingState, { payload }: SetSetting) {
      return {
        sortKeyType: payload.sortKeyType,
      }
    },
  },
})

export const { setSetting } = settingSlice.actions
