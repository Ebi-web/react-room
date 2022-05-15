import { FC } from 'react'
import type { Task } from '../types/Task'

interface TaskListProps {
  taskList: Task[]
}

const TaskList: FC<TaskListProps> = (props) => {
  return (
    <ul>
      {
        props.taskList.map(task => (
            <li
              key={task.taskId}
            >{task.taskName}</li>
          )
        )
      }
    </ul>
  )
}

export default TaskList