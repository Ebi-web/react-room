import { FC, useState } from 'react'
import { ulid } from 'ulid'

import type { Task } from '../types/Task'


interface TaskAddProps {
  addTask: (task: Task) => void
}

const TaskAdd: FC<TaskAddProps> = (props) => {
  const [inputTaskName, setInputTaskName] = useState('')

  const addTaskLocal = () => {
    const newTask: Task = {
      taskId: ulid(),
      taskName: inputTaskName,
      dueDate: new Date()
    }

    props.addTask(newTask)
    // reset
    setInputTaskName('')
  }

  return (
    <div>
      <input
        type="text"
        value={inputTaskName}
        onChange={(event) => setInputTaskName(event.target.value)}
      />
      <button
        onClick={addTaskLocal}
        className="border-2 m-5"
      >追加</button>
    </div>
    
  )
}

export default TaskAdd