// null (最上位親タスクの時) | ulid (それ以外)
type ParentTaskIdType = string | null

type ChangeStatus = boolean

interface GetAllChildTasksArgs {
  task: Task
  tasksInState: Task[]
}

interface GetAllParentTasksArgs {
  task: Task
  tasksInState: Task[]
}

interface GetParentTaskArgs {
  task: Task
  tasksInState: Task[]
}

interface GetTasksOneLevelDownArgs {
  task: Task
  tasksInState: Task[]
}

interface CheckTasksChangingStatus {
  tasks: Task[]
}

interface ChangeStatusResponse {
  success: boolean
  errType: 'CHILD_TASK_INCOMPLETE_ERROR' | 'PARENT_TASKS_CLOSED' | undefined
  message: string | undefined
}

interface Task {
  taskId: string // ulid
  parentTaskId: ParentTaskIdType
  taskName: string
  dueDate: string
  status: ChangeStatus
}

type DeleteTask = (taskId: string) => void

export {
  ParentTaskIdType,
  Task,
  DeleteTask,
  ChangeStatus,
  ChangeStatusResponse,
  CheckTasksChangingStatus,
  GetTasksOneLevelDownArgs,
  GetAllChildTasksArgs,
  GetAllParentTasksArgs,
  GetParentTaskArgs,
}
