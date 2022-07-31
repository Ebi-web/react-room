import { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../stores/TaskListSlice'
import type { Task } from '../types/Task'
import { Modal, TextInput, Group, Box } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { DateFormat, validateTask } from '../functions/Task'

interface EditAction {
  task: Task
}

const TaskEdit: FC<EditAction> = (props) => {
  const [opened, setOpened] = useState(false)
  const [taskName, setTaskName] = useState(props.task.taskName)
  const [dueDate, setDueDate] = useState(new Date(props.task.dueDate))
  const dispatch = useDispatch()

  const updateTaskLocal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const task: Task = {
      ...props.task,
      dueDate: dayjs(dueDate).format(DateFormat),
      taskName,
    }

    //validation
    const msg = validateTask(task)
    if (msg) {
      showNotification({
        title: 'タスクの編集に失敗しました',
        message: msg,
        autoClose: 5000,
        color: 'red',
      })
      return
    }

    dispatch(updateTask(task))
    showNotification({
      message: 'タスクの編集に成功しました',
      autoClose: 5000,
      color: 'green',
    })
    //clean up
    setOpened(false)
  }

  return (
    <>
      {/*edit button*/}
      <button
        className="m-3 p-2 hover:opacity-50"
        onClick={() => {
          setOpened(true)
        }}
      >
        <span className="m-1 select-none hover:opacity-50">
          <FontAwesomeIcon icon={faPencil} />
          <span></span>
        </span>
      </button>

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title={`タスク:${props.task.taskName}を編集`}
      >
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={(e) => updateTaskLocal(e)}>
            <TextInput
              required
              label="タスク名"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <DatePicker
              placeholder="締切日を選択してください"
              label="締切日"
              required
              value={dueDate}
              onChange={(e) =>
                e == null ? setDueDate(new Date()) : setDueDate(e)
              }
            />

            <Group position="right" mt="md">
              <button
                type="submit"
                className="border-2 m-5 p-2 rounded-md shadow-md hover:shadow-none"
              >
                <span className="m-1">確認</span>
              </button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default TaskEdit
