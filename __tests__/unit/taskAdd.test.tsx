import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskAdd from '../../src/components/TaskAdd'

describe('TaskAdd', () => {
  const addTaskFunc = jest.fn()
  beforeEach(() => {
    addTaskFunc.mockClear()
    render(<TaskAdd addTask={addTaskFunc} />)
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

  it('追加するタスクが正しく親に渡される', async () => {
    const testTaskName = 'taskname1'
    const testDueDate = '2022-01-01'

    await inputTaskName(testTaskName)
    await inputDueDate(testDueDate)
    await clickTaskAddButton()

    expect(addTaskFunc).toHaveBeenCalledTimes(1)
    const addedTask = addTaskFunc.mock.calls[0][0]
    expect(addedTask.taskId).toMatch(/^[A-Z0-9]{26}$/) // ulid
    expect(addedTask.taskName).toBe(testTaskName)
    expect(addedTask.dueDate).toBe(testDueDate)
  })

  it('入力したタスク名が空で追加を押したら、エラーを表示する', async () => {
    const testDueDate = '2022-01-01'
    await inputDueDate(testDueDate)
    await clickTaskAddButton()

    expect(addTaskFunc).toHaveBeenCalledTimes(0)
    expect(screen.getByText('タスク名が入力されていません---'))
  })

  it('締切の日付を入力せず追加を押したら、エラーを表示する', async () => {
    const testTaskName = 'taskname1'
    await inputTaskName(testTaskName)
    await clickTaskAddButton()

    expect(addTaskFunc).toHaveBeenCalledTimes(0)
    expect(screen.getByText('タスク締切が入力されていません'))
  })
})
