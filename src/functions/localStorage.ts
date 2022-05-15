import type { Task } from '../types/Task'

const TASK_LIST_NAME = 'taskList'

const getTaskListFromLocalStorage = (): Task[] => {
  const taskListString = localStorage.getItem(TASK_LIST_NAME)
  if (taskListString === null) {
    return []
  }
  const taskListJSON = JSON.parse(taskListString) as Task[]
  return taskListJSON
}
const setTaskListToLocalStorage = (taskList: Task[]) => {
  localStorage.setItem(TASK_LIST_NAME, JSON.stringify(taskList))
}

export {
  getTaskListFromLocalStorage,
  setTaskListToLocalStorage
}