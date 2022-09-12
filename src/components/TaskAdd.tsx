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
import { Box, Group, Modal, TextInput, Button } from '@mantine/core'

interface TaskAddParameters {
  parentTaskId: ParentTaskIdType
}

const TaskAdd: FC<TaskAddParameters> = (props) => {
  // local
  const [opened, setOpened] = useState(false)
  const [inputTaskName, setInputTaskName] = useState('')
  const [inputStartDate, setInputStartDate] = useState(new Date())
  const [inputDueDate, setInputDueDate] = useState(new Date())
  const dispatch = useDispatch()

  const addTaskLocal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTask: Task = {
      taskId: ulid(),
      parentTaskId: props.parentTaskId,
      taskName: inputTaskName,
      startDate: dayjs(inputStartDate).format(DateFormat),
      dueDate: dayjs(inputDueDate).format(DateFormat),
      status: false,
      assignLabelIdList: [],
    }
    console.warn(newTask)
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
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="md"
        className="border-2 m-5 p-2 "
        onClick={() => {
          setOpened(true)
        }}
      >
        <span className="m-1 select-none ">
          <FontAwesomeIcon icon={faPlus} />
        </span>
        <span>新規タスク追加</span>
      </Button>

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
              placeholder="開始日を選択してください"
              label="開始日"
              required
              value={inputStartDate}
              onChange={(e) =>
                e == null ? setInputStartDate(new Date()) : setInputStartDate(e)
              }
            />

            <DatePicker
              placeholder="締切日を選択してください"
              label="締切日"
              required
              value={inputDueDate}
              onChange={(e) =>
                e == null ? setInputDueDate(new Date()) : setInputDueDate(e)
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

export default TaskAdd
