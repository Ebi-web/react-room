import { FC, useState } from 'react'
import { ulid } from 'ulid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import type { Task } from '../types/Task'

interface TaskAddProps {
  addTask: (task: Task) => void
}

const TaskAdd: FC<TaskAddProps> = (props) => {
  const [inputTaskName, setInputTaskName] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [errorText, setErrorText] = useState('')
  const [inputParentTaskId, setInputParentTaskId] = useState('')

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
      parentTaskId: inputParentTaskId ? inputParentTaskId : null,
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
      <div>
        <span className="text-red-500">**開発用表示** 親タスクID:</span>
        <input
          type="text"
          className="w-80"
          onChange={(event) => setInputParentTaskId(event.target.value)}
        />
      </div>
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
          <span className="m-1">追加</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {errorText ? <div className="bg-red-200 m-1 p-1">{errorText}</div> : ''}
    </div>
  )
}

export default TaskAdd
