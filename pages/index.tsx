import { useState, useEffect, FC } from 'react'
import type { Task } from '../src/types/Task'
import {
  getTaskListFromLocalStorage,
  setTaskListToLocalStorage,
} from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'

const Index: FC<void> = () => {
  const [taskList, setTaskList] = useState<Task[]>([])

  useEffect(() => {
    const loadedTaskList = getTaskListFromLocalStorage()
    setTaskList(loadedTaskList)
  }, [])

  const addTask = (task: Task) => {
    const newTaskList = [...taskList, task]
    setTaskList(newTaskList)
    setTaskListToLocalStorage(newTaskList)
  }
  const clearTaskList = () => {
    setTaskList([])
    setTaskListToLocalStorage([])
  }

  return (
    <>
      <Header />
      <div>
        <TaskAdd addTask={addTask} />
      </div>

      <div>
        <TaskClear clearTaskList={clearTaskList} />
      </div>

      <div className="ml-8">
        <TaskList taskList={taskList} />
      </div>
    </>
  )
}

export default Index
