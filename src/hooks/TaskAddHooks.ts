import { Dispatch, SetStateAction, createContext } from 'react'
import type { ParentTaskIdType } from '../types/Task'

interface TaskAddParentIdContextType {
  taskAddParentId: ParentTaskIdType
  setTaskAddParentId: Dispatch<SetStateAction<ParentTaskIdType>>
}
export const TaskAddParentIdContext = createContext<TaskAddParentIdContextType>(
  {
    taskAddParentId: null,
    setTaskAddParentId: () => {},
  }
)
