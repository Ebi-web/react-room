// null (最上位親タスクの時) | ulid (それ以外)
type ParentTaskIdType = string | null

interface Task {
  taskId: string // ulid
  parentTaskId: ParentTaskIdType
  taskName: string
  dueDate: string // YYYY-MM-DD
}

type DeleteTask = (taskId: string) => void

export { ParentTaskIdType, Task, DeleteTask }
