// null (最上位親タスクの時) | ulid (それ以外)
type ParentTaskIdType = string | null

type ChangeStatus = boolean

interface Task {
  taskId: string // ulid
  parentTaskId: ParentTaskIdType
  taskName: string
  dueDate: string // YYYY-MM-DD でもDate型かdayjs系の型に変えたい...
  status: ChangeStatus
}

type DeleteTask = (taskId: string) => void

export { ParentTaskIdType, Task, DeleteTask, ChangeStatus }
