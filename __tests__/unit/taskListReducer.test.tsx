import { store } from '../../src/stores/store'
import {
  addTask,
  updateTask,
  deleteTask,
  setTaskList,
  clearTaskList,
} from '../../src/stores/TaskListSlice'
import type { Task } from '../../src/types/Task'

const task: Task = {
  taskId: '01G6NM6EJ7C35J6ZHF6Z3CHGVK',
  parentTaskId: null,
  taskName: 'タスク名1',
  dueDate: '2222-06-29',
  status: false,
}

// testやdescribeの外でもstateは維持されてしまう
describe('タスクリストreducerのテスト', () => {
  test('初期値は空の配列である', () => {
    const initial_state = store.getState().taskList
    const expected_state = {
      taskList: [],
    }
    expect(initial_state).toEqual(expected_state)
  })

  test('タスクの追加ができる', () => {
    const add_task: Task = { ...task }
    store.dispatch(addTask(add_task))
    expect(store.getState().taskList).toEqual({ taskList: [task] })
  })

  test('タスク更新ができる', () => {
    const update_task: Task = { ...task }
    update_task.taskName = 'タスク名1-updated'
    store.dispatch(updateTask(update_task))
    expect(store.getState().taskList).toEqual({ taskList: [update_task] })
  })

  test('タスクの削除ができる', () => {
    const deleteTaskId: string = task.taskId
    store.dispatch(deleteTask(deleteTaskId))
    expect(store.getState().taskList).toEqual({ taskList: [] })
  })

  test('タスクリストをセットできる', () => {
    const newTaskList: Task[] = [task]
    store.dispatch(setTaskList(newTaskList))
    expect(store.getState().taskList).toEqual({ taskList: newTaskList })
  })

  test('タスクリストをclearできる', () => {
    store.dispatch(clearTaskList())
    expect(store.getState().taskList).toEqual({ taskList: [] })
  })
})
