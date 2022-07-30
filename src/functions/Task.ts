import type {
  ChangeStatusResponse,
  CheckTasksChangingStatus,
  GetAllChildTasksArgs,
  GetAllParentTasksArgs,
  GetParentTaskArgs,
  GetTasksOneLevelDownArgs,
  Task,
} from '../types/Task'
import dayjs from 'dayjs'
import { getAllTaskListFromLocalStorage } from './localStorage'
import { isAfterOrSameByDate, isBeforeOrSameByDate } from './helpers/Dayjs'

function validateDate(date: string, format: string): boolean {
  return dayjs(date, format).format(format) === date
}

export function validateTask(task: Task): string {
  if (task.taskId.length !== 26) {
    return 'タスクIDが不正です'
  }
  if (task.taskName === '') {
    return 'タスク名を入力してください'
  }

  const currentDate = dayjs()
  const dueDate = dayjs(task.dueDate)
  if (!validateDate(task.dueDate, DateFormat)) {
    return '期限が不正です'
  }
  if (!isAfterOrSameByDate(currentDate, dueDate)) {
    return '締め切り日は未来の日付にしてください'
  }

  //check if all parent tasks dueDate is before dueDate of current task
  const parentTasks = getAllParentTasks({
    task: task,
  })
  if (parentTasks.length !== 0) {
    const parentTasksDueDate = parentTasks.map((t) => dayjs(t.dueDate))
    if (parentTasksDueDate.some((d) => !isAfterOrSameByDate(d, dueDate))) {
      return 'タスクの期限は全ての親タスクよりも後でなければなりません'
    }
  }
  //check if all child tasks dueDate is after dueDate of current task
  const childTasks = getAllChildTasks({
    task: task,
  })
  if (childTasks.length !== 0) {
    const childTasksDueDate = childTasks.map((t) => dayjs(t.dueDate))
    if (childTasksDueDate.some((d) => !isBeforeOrSameByDate(d, dueDate))) {
      return 'タスクの期限は全ての子タスクよりも前でなければなりません'
    }
  }

  return ''
}

// Get child tasks one level down when changing status
function getTasksOneLevelDown(args: GetTasksOneLevelDownArgs): Task[] {
  const tasks = getAllTaskListFromLocalStorage()
  return tasks.filter((t) => t.parentTaskId === args.task.taskId)
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
      } as GetTasksOneLevelDownArgs)
    )
  }, childTasks)
}

//stateじゃなくて、全部localStorageから取ってくるようにしたい
function getParentTask(args: GetParentTaskArgs): Task | undefined {
  if (args.task.parentTaskId === null) {
    return undefined
  }
  const tasks = getAllTaskListFromLocalStorage()

  return tasks.find((t) => t.taskId === args.task.parentTaskId)
}

function getAllParentTasks(args: GetAllParentTasksArgs): Task[] {
  const parentTasks = [] as Task[]
  let parentTask: Task | undefined = getParentTask({ task: args.task })

  while (parentTask !== undefined) {
    parentTasks.push(parentTask)
    parentTask = getParentTask({
      task: parentTask,
    })
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

export function validateClosingTask(task: Task): ChangeStatusResponse {
  const tasks = getAllChildTasks({
    task,
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

export function validateReopeningTask(task: Task): ChangeStatusResponse {
  const tasks = getAllParentTasks({
    task,
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
