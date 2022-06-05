import { useState, useEffect, FC, useReducer } from 'react'
import type { Task, ParentTaskIdType } from '../src/types/Task'
import { getTaskListFromLocalStorage } from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'

import { TaskAddParentIdContext } from '../src/hooks/TaskAddHooks'
import { TaskListContext, TaskListReducer } from '../src/hooks/TaskListHooks'

const initialTaskList = [] as Task[]

const Index: FC<void> = () => {
  const [taskAddParentId, setTaskAddParentId] = useState<ParentTaskIdType>(null)
  const [taskListState, taskListDispatch] = useReducer(
    TaskListReducer,
    initialTaskList
  )

  useEffect(() => {
    const loadedTaskList = getTaskListFromLocalStorage()
    taskListDispatch({
      command: 'SET_TASKLIST',
      value: loadedTaskList,
    })
  }, [])

  return (
    <>
      <Header />

      <TaskListContext.Provider value={{ taskListState, taskListDispatch }}>
        <div>
          <TaskAddParentIdContext.Provider
            value={{ taskAddParentId, setTaskAddParentId }}
          >
            <TaskAdd />
          </TaskAddParentIdContext.Provider>
        </div>

        <div>
          <TaskClear />
        </div>

        <div className="ml-8">
          <TaskAddParentIdContext.Provider
            value={{ taskAddParentId, setTaskAddParentId }}
          >
            <TaskList taskList={taskListState} parentTaskId={null} depth={0} />
          </TaskAddParentIdContext.Provider>
        </div>
      </TaskListContext.Provider>
    </>
  )
}

export default Index
