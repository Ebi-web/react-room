import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ulid } from 'ulid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import type { Task } from '../types/Task'
import { validateTask } from '../functions/Task'
import { addTask } from '../stores/TaskListSlice'
import { RootState } from '../stores/store'

const TaskAdd: FC<{}> = () => {
  // local
  const [inputTaskName, setInputTaskName] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [errorText, setErrorText] = useState('')
  // global
  const parentTaskIdSelector = useSelector(
    (state: RootState) => state.parentTaskId
  )
  const dispatch = useDispatch()

  const addTaskLocal = () => {
    const newTask: Task = {
      taskId: ulid(),
      parentTaskId: parentTaskIdSelector.parentTaskId,
      taskName: inputTaskName,
      dueDate: inputDate,
      status: false,
    }
    const err_msg = validateTask(newTask)
    if (err_msg) {
      setErrorText(err_msg)
      return
    }

    dispatch(addTask(newTask))
    setErrorText('')
    setInputTaskName('')
  }

  return (
    <div className="border">
      <div>
        <span className="text-red-500">
          **開発用表示** 親タスクID: {parentTaskIdSelector.parentTaskId}
        </span>
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
