import { getSortedTaskList } from '../../src/functions/TaskListSort'
import type { Task } from '../../src/types/Task'

describe('getSortedTaskList', () => {
  test('ラベルが一つだけのときに設定のラベル順に従ってソートできる', () => {
    const task1: Task = {
      taskId: '1',
      parentTaskId: null,
      assignLabelIdList: ['3'],
      taskName: 'タスク1',
      dueDate: '2020-01-01',
      status: false,
    }
    const task2: Task = {
      taskId: '2',
      parentTaskId: null,
      assignLabelIdList: ['2'],
      taskName: 'タスク2',
      dueDate: '2020-01-01',
      status: false,
    }
    const task3: Task = {
      taskId: '3',
      parentTaskId: null,
      assignLabelIdList: ['1'],
      taskName: 'タスク3',
      dueDate: '2020-01-01',
      status: false,
    }
    const taskList = [task1, task2, task3]
    const sortKey = 'label'
    const sortPriorityLabelIdList = ['1', '2', '3']
    const sortedTaskList = getSortedTaskList(
      taskList,
      sortKey,
      sortPriorityLabelIdList
    )
    const expectTaskList: Task[] = [task3, task2, task1]
    expect(sortedTaskList).toEqual(expectTaskList)
  })

  test('ラベルが一つだけのときに設定のラベル順に従ってソートできる(優先順位のないラベルがある場合)', () => {
    const task1: Task = {
      taskId: '1',
      parentTaskId: null,
      assignLabelIdList: ['3'],
      taskName: 'タスク1',
      dueDate: '2020-01-01',
      status: false,
    }
    const task2: Task = {
      taskId: '2',
      parentTaskId: null,
      assignLabelIdList: ['2'],
      taskName: 'タスク2',
      dueDate: '2020-01-01',
      status: false,
    }
    const task3: Task = {
      taskId: '3',
      parentTaskId: null,
      assignLabelIdList: ['1'],
      taskName: 'タスク3',
      dueDate: '2020-01-01',
      status: false,
    }
    const taskList = [task1, task2, task3]
    const sortKey = 'label'
    const sortPriorityLabelIdList = ['1', '3']
    const sortedTaskList = getSortedTaskList(
      taskList,
      sortKey,
      sortPriorityLabelIdList
    )
    const expectTaskList: Task[] = [task3, task1, task2]
    expect(sortedTaskList).toEqual(expectTaskList)
  })

  test('ラベルが複数あるときに設定のラベル順に従ってソートできる', () => {
    const task1: Task = {
      taskId: '1',
      parentTaskId: null,
      assignLabelIdList: ['3'],
      taskName: 'タスク1',
      dueDate: '2020-01-01',
      status: false,
    }
    const task2: Task = {
      taskId: '2',
      parentTaskId: null,
      assignLabelIdList: ['3', '2'],
      taskName: 'タスク2',
      dueDate: '2020-01-01',
      status: false,
    }
    const task3: Task = {
      taskId: '3',
      parentTaskId: null,
      assignLabelIdList: ['1', '3', '2'],
      taskName: 'タスク3',
      dueDate: '2020-01-01',
      status: false,
    }
    const taskList = [task1, task2, task3]
    const sortKey = 'label'
    const sortPriorityLabelIdList = ['1', '2', '3']
    const sortedTaskList = getSortedTaskList(
      taskList,
      sortKey,
      sortPriorityLabelIdList
    )
    const expectTaskList: Task[] = [task3, task2, task1]
    expect(sortedTaskList).toEqual(expectTaskList)
  })
})
