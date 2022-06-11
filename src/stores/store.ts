import { configureStore } from '@reduxjs/toolkit'
import { TaskAddState, taskAddSlice } from './TaskAddSlice'
import { TaskListState, taskListSlice } from './TaskListSlice'

export interface RootState {
  parentTaskId: TaskAddState
  taskList: TaskListState
}

export const store = configureStore({
  reducer: {
    parentTaskId: taskAddSlice.reducer,
    taskList: taskListSlice.reducer,
  },
})
