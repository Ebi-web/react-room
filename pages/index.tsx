import { useState, useEffect, FC } from 'react'
import type { Task, ParentTaskIdType } from '../src/types/Task'
import {
  getTaskListFromLocalStorage,
  setTaskListToLocalStorage,
} from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'

import { TaskAddParentIdContext } from '../src/hooks/TaskAddHooks'

const Index: FC<void> = () => {
  const [taskAddParentId, setTaskAddParentId] = useState<ParentTaskIdType>(null)
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    const loadedTaskList = getTaskListFromLocalStorage()
    setTaskList(loadedTaskList)
  }, [])

  const setTaskListStateAndStorage = (newTaskList: Task[]) => {
    console.warn(newTaskList)
    setTaskList(newTaskList)
    setTaskListToLocalStorage(newTaskList)
  }

  const addTask = (task: Task) => {
    const newTaskList = [...taskList, task]
    setTaskListStateAndStorage(newTaskList)
  }
  const clearTaskList = () => {
    const newTaskList = [] as Task[]
    setTaskListStateAndStorage(newTaskList)
  }
  const deleteTask = (taskId: string) => {
    const newTaskList = taskList.filter((task) => task.taskId !== taskId)
    setTaskListStateAndStorage(newTaskList)
  }

  return (
    <>
      <Header />

      <div>
        <TaskAddParentIdContext.Provider
          value={{ taskAddParentId, setTaskAddParentId }}
        >
          <TaskAdd addTask={addTask} />
        </TaskAddParentIdContext.Provider>
      </div>

      <div>
        <TaskClear clearTaskList={clearTaskList} />
      </div>

      <div className="ml-8">
        <TaskAddParentIdContext.Provider
          value={{ taskAddParentId, setTaskAddParentId }}
        >
          <TaskList
            taskList={taskList}
            parentTaskId={null}
            depth={0}
            deleteTask={deleteTask}
          />
        </TaskAddParentIdContext.Provider>
      </div>
    </>
  )
}

export default Index
