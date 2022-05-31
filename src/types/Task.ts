//Taskに関する処理はここへまとめる
import {
  getAllTaskListFromLocalStorage,
  updateTaskInLocalStorage,
} from '../functions/localStorage'

interface Task {
  taskId: string // ulid
  taskName: string
  dueDate: string // YYYY-MM-DD
}

export function validateTask(task: Task): string {
  if (task.taskId.length !== 26) {
    return 'タスクIDが不正です'
  }
  if (task.taskName === '') {
    return 'タスク名を入力してください'
  }
  const dueDate = new Date(task.dueDate)
  if (isNaN(dueDate.getDate())) {
    return '期限が不正です'
  }
  return ''
}

export function updateTask(
  task: Task,
  setTaskList: (taskList: Task[]) => void
): void {
  //TODO:トランザクション処理が必要
  try {
    updateTaskInLocalStorage(task)
    setTaskList(getAllTaskListFromLocalStorage())
  } catch (error) {
    throw new Error('タスクの編集に失敗しました')
  }
}

export type { Task }
