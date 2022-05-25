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

  const setTaskListStateAndStorage = (newTaskList: Task[]) => {
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
        <TaskAdd addTask={addTask} />
      </div>

      <div>
        <TaskClear clearTaskList={clearTaskList} />
      </div>

      <div className="ml-8">
        <TaskList taskList={taskList} deleteTask={deleteTask} />
      </div>
    </>
  )
}

export default Index
