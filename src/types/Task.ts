//Taskに関する処理はここへまとめる
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
  if (task.dueDate === '') {
    return '期限を入力してください'
  }
  return ''
}

export type { Task }
