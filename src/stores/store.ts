import { configureStore } from '@reduxjs/toolkit'
import { TaskAddState, taskAddSlice } from './TaskAddSlice'
import { TaskListState, taskListSlice } from './TaskListSlice'
import { SettingState, settingSlice } from './SettingSlice'
import { ModalState, modalSlice } from './ModalSlice'

export interface RootState {
  parentTaskId: TaskAddState
  taskList: TaskListState
  setting: SettingState
  modal: ModalState
}

export const store = configureStore({
  reducer: {
    parentTaskId: taskAddSlice.reducer,
    taskList: taskListSlice.reducer,
    setting: settingSlice.reducer,
    modal: modalSlice.reducer,
  },
})
