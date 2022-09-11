import { FC, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ulid } from 'ulid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import type { ParentTaskIdType, Task } from '../types/Task'
import { DateFormat, validateTask } from '../functions/Task'
import { addTask } from '../stores/TaskListSlice'
import { DatePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import { showNotification } from '@mantine/notifications'
import { Box, Group, Modal, TextInput } from '@mantine/core'
import { Tooltip } from './Tooltip'

interface TaskAddParameters {
  parentTaskId: ParentTaskIdType
}

const ChildrenTaskAdd: FC<TaskAddParameters> = (props) => {
  // local
  const [opened, setOpened] = useState(false)
  const [inputTaskName, setInputTaskName] = useState('')
  const [inputDate, setInputDate] = useState(new Date())
  const dispatch = useDispatch()

  const addTaskLocal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask: Task = {
      taskId: ulid(),
      parentTaskId: props.parentTaskId,
      taskName: inputTaskName,
      dueDate: dayjs(inputDate).format(DateFormat),
      status: false,
      assignLabelIdList: [],
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

    dispatch(addTask(newTask))

    showNotification({
      message: 'タスクの追加に成功しました',
      autoClose: 5000,
      color: 'green',
    })
    setOpened(false)
    setInputTaskName('')
  }

  const onClose = () => {
    setOpened(false)
    setInputTaskName('')
  }

  return (
    <>
      {/*edit button*/}
      <button
        className="m-3 p-2 hover:opacity-50 sm:m-0"
        onClick={() => {
          setOpened(true)
        }}
      >
        <Tooltip tooltipText="子タスク追加">
          <span className="m-1 select-none hover:opacity-50">
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </Tooltip>
        <span></span>
      </button>

      <Modal
        centered
        opened={opened}
        onClose={() => onClose()}
        title="タスクを追加"
      >
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={(e) => addTaskLocal(e)}>
            <TextInput
              required
              label="タスク名"
              value={inputTaskName}
              onChange={(e) => setInputTaskName(e.target.value)}
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

export default ChildrenTaskAdd
