import type {
  ChangeStatusResponse,
  CheckTasksChangingStatus,
  GetAllChildTasksArgs,
  GetAllParentTasksArgs,
  GetParentTaskArgs,
  GetTasksOneLevelDownArgs,
  Task,
} from '../types/Task'

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

// Get child tasks one level down when changing status
function getTasksOneLevelDown(args: GetTasksOneLevelDownArgs): Task[] {
  const { task, tasksInState } = args
  return tasksInState.filter((t) => t.parentTaskId === task.taskId)
}

function getAllChildTasks(args: GetAllChildTasksArgs): Task[] {
  const childTasks = getTasksOneLevelDown(args)
  if (childTasks.length === 0) {
    return []
  }
  return childTasks.reduce((acc: Task[], t) => {
    return acc.concat(
      getTasksOneLevelDown({
        task: t,
        tasksInState: args.tasksInState,
      } as GetTasksOneLevelDownArgs)
    )
  }, childTasks)
}

function getParentTask(args: GetParentTaskArgs): Task | undefined {
  if (args.task.parentTaskId === null) {
    return undefined
  }
  return args.tasksInState.find((t) => t.taskId === args.task.parentTaskId)
}

function getAllParentTasks(args: GetAllParentTasksArgs): Task[] {
  const parentTasks = [] as Task[]
  let currentArgs = args
  let parentTask: Task | undefined = getParentTask(currentArgs)

  while (parentTask !== undefined) {
    parentTasks.push(parentTask)
    currentArgs = {
      task: parentTask,
      tasksInState: args.tasksInState,
    }
    parentTask = getParentTask(currentArgs)
  }

  return parentTasks
}

// Check for problematic tasks in child tasks one level down when changing status
function areChildTasksOk(args: CheckTasksChangingStatus): boolean {
  const { tasks } = args
  return tasks.filter((t) => t.status === false).length === 0
}

function areParentTasksOk(args: CheckTasksChangingStatus): boolean {
  const { tasks } = args
  return tasks.filter((t) => t.status === true).length === 0
}

export function validateClosingTask(
  task: Task,
  tasksInState: Task[]
): ChangeStatusResponse {
  const tasks = getAllChildTasks({
    task,
    tasksInState,
  } as GetAllChildTasksArgs)
  if (!areChildTasksOk({ tasks } as CheckTasksChangingStatus)) {
    return {
      success: false,
      errType: 'CHILD_TASK_INCOMPLETE_ERROR',
      message: '子タスクが未完了です',
    }
  }
  return {
    success: true,
    errType: undefined,
    message: undefined,
  }
}

export function validateReopeningTask(
  task: Task,
  tasksInState: Task[]
): ChangeStatusResponse {
  const tasks = getAllParentTasks({
    task,
    tasksInState,
  } as GetAllParentTasksArgs)
  if (!areParentTasksOk({ tasks } as CheckTasksChangingStatus)) {
    return {
      success: false,
      errType: 'PARENT_TASKS_CLOSED',
      message: '親タスクが完了しています',
    }
  }
  return {
    success: true,
    errType: undefined,
    message: undefined,
  }
}

export const DateFormat = 'YYYY-MM-DD'
