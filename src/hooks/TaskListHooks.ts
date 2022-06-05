import type { Task, ParentTaskIdType } from '../types/Task'
import { setTaskListToLocalStorage } from '../functions/localStorage'
import { Dispatch, createContext } from 'react'

export type TaskListActionCommandType =
  | 'SET_TASKLIST'
  | 'CLEAR_TASKLIST'
  | 'ADD_TASK'
  | 'UPDATE_TASK'
  | 'DELETE_TASK'

type TaskListActionValueType = Task[] | Task | ParentTaskIdType

interface TaskListActionType {
  command: TaskListActionCommandType
  value?: TaskListActionValueType // undefined ありかどうか後で考え直す, 関数を返すようにラップすれば解決しそう
}

interface TaskListContextType {
  taskListState: Task[]
  taskListDispatch: Dispatch<TaskListActionType>
}
export const TaskListContext = createContext<TaskListContextType>({
  taskListState: [],
  taskListDispatch: () => {},
})

//  case内が少し汚い：上手く型定義できないか
// switch内を取り出してunitテスト書く
export const TaskListReducer = (
  taskListState: Task[],
  action: TaskListActionType
): Task[] => {
  let newTaskListState: Task[]
  switch (action.command) {
    case 'SET_TASKLIST':
      if (Array.isArray(action.value)) {
        newTaskListState = action.value
      } else {
        throw new Error('タスクリストの更新に失敗しました:SET_TASKLIST')
      }
      break
    case 'CLEAR_TASKLIST':
      newTaskListState = []
      break
    case 'ADD_TASK':
      if (
        action.value &&
        !Array.isArray(action.value) &&
        typeof action.value === 'object'
      ) {
        newTaskListState = [...taskListState, action.value]
      } else {
        console.warn(action.value)
        throw new Error('タスクリストの更新に失敗しました:ADD_TASK')
      }
      break
    case 'UPDATE_TASK':
      /**
       * TODO
       */
      throw new Error('TODO')
    case 'DELETE_TASK':
      newTaskListState = taskListState.filter(
        (task) => task.taskId !== action.value
      )
      break
  }
  setTaskListToLocalStorage(newTaskListState)
  return newTaskListState
}
