import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { ParentTaskIdType } from '../types/Task'

export interface TaskAddState {
  parentTaskId: ParentTaskIdType
}

interface TaskAddSetParentId {
  payload: ParentTaskIdType
}

export const taskAddSlice = createSlice({
  name: 'taskAdd',
  initialState: {
    parentTaskId: null,
  } as TaskAddState,
  reducers: {
    setParentTaskId(_: TaskAddState, { payload }: TaskAddSetParentId) {
      return {
        parentTaskId: payload,
      }
    },
  },
})

export const { setParentTaskId } = taskAddSlice.actions

export const taskAddStore = configureStore({
  reducer: {
    parentTaskId: taskAddSlice.reducer,
  },
})
