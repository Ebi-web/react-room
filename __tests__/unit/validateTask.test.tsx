import { validateTask } from '../../src/functions/Task'
import type { Task } from '../../src/types/Task'

describe('タスク追加バリデーション', () => {
  test('正常なタスクならば、空のエラー文を返す', () => {
    const task: Task = {
      taskId: '01G6NM6EJ7C35J6ZHF6Z3CHGVK',
      parentTaskId: null,
      taskName: 'タスク名',
      dueDate: '2222-06-29',
      status: false,
    }

    const err_msg = validateTask(task)
    expect(err_msg).toEqual('')
  })

  test('タスクidの長さがおかしいならば、エラー分を返す', () => {
    const task: Task = {
      taskId: '1',
      parentTaskId: null,
      taskName: 'タスク名',
      dueDate: '2222-06-29',
      status: false,
    }

    const err_msg = validateTask(task)
    expect(err_msg).toEqual('タスクIDが不正です')
  })

  test('タスク名が空ならば、エラー文を返す', () => {
    const task: Task = {
      taskId: '01G6NM6EJ7C35J6ZHF6Z3CHGVK',
      parentTaskId: null,
      taskName: '',
      dueDate: '2222-06-29',
      status: false,
    }
    const err_msg = validateTask(task)
    expect(err_msg).toEqual('タスク名を入力してください')
  })

  test('タスク期限が不正な形式ならば、エラー文を返す', () => {
    const task: Task = {
      taskId: '01G6NM6EJ7C35J6ZHF6Z3CHGVK',
      parentTaskId: null,
      taskName: 'タスク名',
      dueDate: '2222-06-29--------',
      status: false,
    }
    const err_msg = validateTask(task)
    expect(err_msg).toEqual('期限が不正です')
  })

  test('タスク期限が過去の日付ならば、エラー文を返す', () => {
    const task: Task = {
      taskId: '01G6NM6EJ7C35J6ZHF6Z3CHGVK',
      parentTaskId: null,
      taskName: 'タスク名',
      dueDate: '2000-06-29',
      status: false,
    }
    const err_msg = validateTask(task)
    expect(err_msg).toEqual('締め切り日は未来の日付にしてください')
  })
})
