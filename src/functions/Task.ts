import type { Task } from '../types/Task'

export function validateTask(task: Task): string {
  if (task.taskId.length !== 26) {
    return 'タスクIDが不正です'
  }
  if (task.taskName === '') {
    return 'タスク名を入力してください'
  }
  const currentDate = new Date()
  const dueDate = new Date(task.dueDate)
  if (isNaN(dueDate.getDate())) {
    return '期限が不正です'
  }
  if (dueDate.getTime() < currentDate.getTime()) {
    return '締め切り日は未来の日付にしてください'
  }
  return ''
}
