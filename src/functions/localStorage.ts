import type { Task } from '../types/Task'

const TASK_LIST_NAME = 'taskList'

const getAllTaskListFromLocalStorage = (): Task[] => {
  const taskListString = localStorage.getItem(TASK_LIST_NAME)
  if (taskListString === null) {
    return []
  }
  return JSON.parse(taskListString) as Task[]
}
const setTaskListToLocalStorage = (taskList: Task[]) => {
  localStorage.setItem(TASK_LIST_NAME, JSON.stringify(taskList))
}
const getTaskFromLocalStorage = (taskId: string): Task | null => {
  const taskList = getAllTaskListFromLocalStorage()
  const task = taskList.find((task) => task.taskId === taskId)
  return task || null
}
const updateTaskInLocalStorage = (givenTask: Task): void => {
  const taskList = getAllTaskListFromLocalStorage()
  const index = taskList.findIndex((task) => task.taskId === givenTask.taskId)
  if (index === -1) {
    throw new Error('タスクが見つかりません')
  }
  taskList[index] = givenTask
  setTaskListToLocalStorage(taskList)
}

export {
  getAllTaskListFromLocalStorage,
  setTaskListToLocalStorage,
  getTaskFromLocalStorage,
  updateTaskInLocalStorage,
}
