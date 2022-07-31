import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearTaskList } from '../stores/TaskListSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Button, Group, Modal } from '@mantine/core'

const TaskClear: FC = () => {
  const [opened, setOpened] = useState(false)
  const dispatch = useDispatch()

  const onClose = () => {
    setOpened(false)
  }

  return (
    <>
      <Button
        variant="outline"
        color="dark"
        radius="md"
        size="md"
        className="border-2 m-5 p-2 hover:opacity-50"
        // onClick={() => dispatch(clearTaskList())}
        onClick={() => {
          setOpened(true)
        }}
      >
        <span className="m-1">
          <FontAwesomeIcon icon={faTrashCan} />
        </span>
        <span>すべて削除</span>
      </Button>

      <Modal
        centered
        opened={opened}
        onClose={() => onClose()}
        title="全てのタスクを削除します、よろしいですか？"
      >
        <Group position="right" mt="md">
          <button
            type="submit"
            className="border-2 m-5 p-2 rounded-md shadow-md hover:shadow-none"
            onClick={() => {
              dispatch(clearTaskList())
              onClose()
            }}
          >
            <span className="m-1">OK</span>
          </button>
        </Group>
      </Modal>
    </>
  )
}

export default TaskClear
