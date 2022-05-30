import { FC, useState } from 'react'
import type { Task } from '../types/Task'
import { validateTask } from '../types/Task'
import { Button, Label, Modal, TextInput } from 'flowbite-react'

const EditTaskButton: FC<Task> = (props) => {
  const [inputTaskName, setInputTaskName] = useState(props.taskName)
  const [inputDueDate, setInputDueDate] = useState(props.dueDate)
  const [errMessage, setErrMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const updateTaskLocal = () => {
    const updatedTask: Task = {
      taskId: props.taskId,
      taskName: inputTaskName,
      dueDate: inputDueDate,
    }
    const msg = validateTask(updatedTask)
    if (msg !== '') {
      setErrMessage(msg)
      return
    }
    // props.updateTask(updatedTask)
    setErrMessage('')
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>タスクの編集</Button>
      <Modal
        show={isModalOpen}
        size="md"
        popup={true}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            タスクの編集
          </h3>
          <div>
            <Label className="mb-2 block" htmlFor="task-name">
              タスク名
            </Label>
            <TextInput
              id="task-name"
              className="dark:border-gray-500 dark:bg-gray-600"
              value={inputTaskName}
              onChange={(event) => setInputTaskName(event.target.value)}
              required={true}
            />
          </div>
          <div>
            <Label className="mb-2 block" htmlFor="due-date">
              締め切り
            </Label>
            <TextInput
              id="due-date"
              className="dark:border-gray-500 dark:bg-gray-600"
              type="date"
              value={inputDueDate}
              onChange={(event) => setInputDueDate(event.target.value)}
              required={true}
            />
          </div>
          <Button className="w-full">編集確定</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditTaskButton
