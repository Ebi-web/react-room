import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { Task } from '../types/Task'
import { setTaskListToLocalStorage } from '../functions/localStorage'

export interface TaskListState {
  taskList: Task[]
}

interface TaskListAddTask {
  payload: Task
}

interface TaskListUpdateTask {
  payload: Task
}

interface TaskListDeleteTask {
  payload: string
}

interface TaskListSetTaskList {
  payload: Task[]
}

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState: {
    taskList: [],
  } as TaskListState,
  reducers: {
    addTask({ taskList }: TaskListState, { payload }: TaskListAddTask) {
      const newTaskList = [...taskList, payload]
      setTaskListToLocalStorage(newTaskList)
      return {
        taskList: newTaskList,
      }
    },
    updateTask({ taskList }: TaskListState, { payload }: TaskListUpdateTask) {
      const updateTaskId = payload.taskId
      const updateTaskIndex = taskList.findIndex(
        (task) => task.taskId === updateTaskId
      )
      if (updateTaskIndex === -1) {
        throw new Error('タスク更新失敗：このタスクは存在しません')
      }
      const newTaskList = [...taskList]
      newTaskList[updateTaskIndex] = payload
      setTaskListToLocalStorage(newTaskList)
      return {
        taskList: newTaskList,
      }
    },
    deleteTask({ taskList }: TaskListState, { payload }: TaskListDeleteTask) {
      const deleteTaskId = payload
      const newTaskList = taskList.filter(
        (task) => task.taskId !== deleteTaskId
      )
      setTaskListToLocalStorage(newTaskList)
      return {
        taskList: newTaskList,
      }
    },
    setTaskList(_: TaskListState, { payload }: TaskListSetTaskList) {
      setTaskListToLocalStorage(payload)
      return {
        taskList: payload,
      }
    },
    clearTaskList(_: TaskListState) {
      const newTaskList = [] as Task[]
      setTaskListToLocalStorage(newTaskList)
      return {
        taskList: newTaskList,
      }
    },
  },
})

export const { addTask, updateTask, deleteTask, setTaskList, clearTaskList } =
  taskListSlice.actions

export const taskListStore = configureStore({
  reducer: {
    taskList: taskListSlice.reducer,
  },
})
