import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ulid } from 'ulid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import type { Task } from '../types/Task'
import { DateFormat, validateTask } from '../functions/Task'
import { addTask } from '../stores/TaskListSlice'
import { RootState } from '../stores/store'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { showNotification } from '@mantine/notifications'
import { TextInput } from '@mantine/core'

const TaskAdd: FC = () => {
  // local
  const [inputTaskName, setInputTaskName] = useState('')
  const [inputDate, setInputDate] = useState(new Date())

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
      dueDate: dayjs(inputDate).format(DateFormat),
      status: false,
    }
    const err_msg = validateTask(newTask)
    if (err_msg) {
      showNotification({
        title: 'タスクの追加に失敗しました',
        message: err_msg,
        autoClose: 5000,
        color: 'red',
      })
      return
    }

    showNotification({
      message: 'タスクの追加に成功しました',
      autoClose: 5000,
      color: 'green',
    })
    dispatch(addTask(newTask))
    setInputTaskName('')
  }

  return (
    <div className="border">
      <div>
        <span className="text-red-500">
          **開発用表示** 親タスクID: {parentTaskIdSelector.parentTaskId}
        </span>
      </div>
      <div className="flex justify-start">
        <TextInput
          placeholder="タスク名"
          label="新規タスク名"
          value={inputTaskName}
          onChange={(event) => setInputTaskName(event.target.value)}
          required
        />

        <DatePicker
          placeholder="締切日を選択してください"
          label="締切日"
          required
          value={inputDate}
          onChange={(e) =>
            e == null ? setInputDate(new Date()) : setInputDate(e)
          }
        />

        <button
          type="submit"
          className="border-2 m-5 p-2 rounded-md shadow-md hover:shadow-none"
          onClick={addTaskLocal}
        >
          <span className="m-1">追加</span>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  )
}

export default TaskAdd
