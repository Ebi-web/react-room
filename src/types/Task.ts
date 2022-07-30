// null (最上位親タスクの時) | ulid (それ以外)
type ParentTaskIdType = string | null

type ChangeStatus = boolean

interface GetAllChildTasksArgs {
  task: Task
}

interface GetAllParentTasksArgs {
  task: Task
}

interface GetParentTaskArgs {
  task: Task
}

interface GetTasksOneLevelDownArgs {
  task: Task
}

interface CheckTasksChangingStatus {
  tasks: Task[]
}

interface ChangeStatusResponse {
  success: boolean
  errType: 'CHILD_TASK_INCOMPLETE_ERROR' | 'PARENT_TASKS_CLOSED' | undefined
  message: string | undefined
}

type Label = {
  id: string
  name: string
  color: string // #000000
}

type Task = {
  taskId: string // ulid
  parentTaskId: ParentTaskIdType
  taskName: string
  dueDate: string
  status: ChangeStatus
  assignLabelIdList: string[]
}

type DeleteTask = (taskId: string) => void

export type {
  ParentTaskIdType,
  Task,
  DeleteTask,
  ChangeStatus,
  Label,
  ChangeStatusResponse,
  CheckTasksChangingStatus,
  GetTasksOneLevelDownArgs,
  GetAllChildTasksArgs,
  GetAllParentTasksArgs,
  GetParentTaskArgs,
}
