import { createSlice } from '@reduxjs/toolkit'

export interface ModalState {
  isOpenLabelAdd: boolean
}

interface ModalStatePayload {
  payload: boolean
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenLabelAdd: false,
  } as ModalState,
  reducers: {
    setIsOpenLabelAdd(state: ModalState, { payload }: ModalStatePayload) {
      return {
        isOpenLabelAdd: payload,
      }
    },
  },
})

export const { setIsOpenLabelAdd } = modalSlice.actions
