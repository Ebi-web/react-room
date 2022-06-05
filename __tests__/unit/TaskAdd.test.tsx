import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskAdd from '../../src/components/TaskAdd'

describe('TaskAdd', () => {
  beforeEach(() => {
    render(<TaskAdd />)
  })

  const inputTaskName = async (taskName: string) => {
    const taskNameInput = screen.getByLabelText('新しいタスク名：')
    await userEvent.type(taskNameInput, taskName)
  }

  const inputDueDate = async (dueDate: string) => {
    const dueDateInput = screen.getByLabelText('締め切り：')
    await userEvent.type(dueDateInput, dueDate)
  }

  const clickTaskAddButton = async () => {
    const taskAddButton = screen.getByText('追加')
    await userEvent.click(taskAddButton)
  }

  it('入力したタスク名が空で追加を押したら、エラーを表示する', async () => {
    const testDueDate = '2022-01-01'
    await inputDueDate(testDueDate)
    await clickTaskAddButton()

    expect(screen.getByText('タスク名を入力してください'))
  })

  it('締切の日付を入力せず追加を押したら、エラーを表示する', async () => {
    const testTaskName = 'taskname1'
    await inputTaskName(testTaskName)
    await clickTaskAddButton()

    expect(screen.getByText('期限が不正です'))
  })
})
