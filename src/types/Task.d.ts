// null (最上位親タスクの時) | ulid (それ以外)
type ParentTaskId = string | null

interface Task {
  taskId: string // ulid
  parentTaskId: ParentTaskId
  taskName: string
  dueDate: string // YYYY-MM-DD
}

type DeleteTask = (taskId: string) => void

export { ParentTaskId, Task, DeleteTask }
