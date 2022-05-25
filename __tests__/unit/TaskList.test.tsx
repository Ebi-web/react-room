import { render, screen } from '@testing-library/react'
import TaskList from '../../src/components/TaskList'
import type { Task } from '../../src/types/Task'

const testTaskList = [
  {
    taskId: '01G3W75FQ8MEE4P1AZMR9V2F00',
    taskName: 'タスク1',
    dueDate: '2022-06-01',
  },
  {
    taskId: '01G3W75PJCKWDVKT9XBNKSYPWJ',
    taskName: 'タスク2',
    dueDate: '2022-06-02',
  },
  {
    taskId: '01G3W75XR6BX4QMNVH7NB1HS3N',
    taskName: 'タスク3',
    dueDate: '2022-06-03',
  },
] as Task[]

describe('TaskList', () => {
  it('渡されたタスクリストの長さが3ならば、3つのタスクが表示される', () => {
    render(<TaskList taskList={testTaskList} />)
    const taskListElement = screen.getAllByTestId('task', { exact: false })
    expect(taskListElement.length).toBe(testTaskList.length)
  })

  it('渡されたタスクリストの長さが3のとき、3つのタスク名が表示される', () => {
    render(<TaskList taskList={testTaskList} />)
    for (const task of testTaskList) {
      screen.getByText(task.taskName)
    }
  })

  it('渡されたタスクリストの長さが3のとき、3つのタスク締切が表示される', () => {
    render(<TaskList taskList={testTaskList} />)
    for (const task of testTaskList) {
      screen.getByText(task.dueDate, { exact: false })
    }
  })
})
