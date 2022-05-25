import { FC, useState } from 'react'
import { ulid } from 'ulid'

import type { Task } from '../types/Task'

interface TaskAddProps {
  addTask: (task: Task) => void
}

const TaskAdd: FC<TaskAddProps> = (props) => {
  const [inputTaskName, setInputTaskName] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [errorText, setErrorText] = useState('')

  const addTaskLocal = () => {
    if (inputTaskName === '') {
      setErrorText('タスク名が入力されていません')
      return
    }
    if (inputDate === '') {
      setErrorText('タスク締切が入力されていません')
      return
    }
    const newTask: Task = {
      taskId: ulid(),
      taskName: inputTaskName,
      dueDate: inputDate,
    }
    props.addTask(newTask)
    // reset
    setErrorText('')
    setInputTaskName('')
  }

  return (
    <div className="border">
      <div className="flex">
        <div className="m-5">
          <label htmlFor="input-taskname">新しいタスク名：</label>
          <input
            type="text"
            id="input-taskname"
            value={inputTaskName}
            className=" w-52 rounded-md"
            onChange={(event) => setInputTaskName(event.target.value)}
          />
        </div>
        <div className="m-5">
          <label htmlFor="input-duedate">締め切り：</label>
          <input
            type="date"
            id="input-duedate"
            value={inputDate}
            className="rounded-md"
            onChange={(event) => {
              setInputDate(event.target.value)
            }}
          />
        </div>
        <button
          type="submit"
          className="border-2 m-5 p-2 rounded-md shadow-md hover:shadow-none"
          onClick={addTaskLocal}
        >
          追加
        </button>
      </div>
      {errorText ? <div className="bg-red-200 m-1 p-1">{errorText}</div> : ''}
    </div>
  )
}

export default TaskAdd
