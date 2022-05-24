import { FC } from 'react'
import type { Task } from '../types/Task'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface TaskListProps {
  taskList: Task[]
  deleteTask: (taskId: string) => void
}

const TaskList: FC<TaskListProps> = (props) => {
  return (
    <ul>
      {props.taskList.map((task) => (
        <div
          className="border w-1/2 flex-col flex break-words mb-3 p-3 rounded-xl shadow-md cursor-pointer	hover:shadow-inner"
          key={task.taskId}
        >
          <div className="flex justify-between">
            <span className="text-xl font-semibold">{task.taskName}</span>
            <span className="hover:opacity-50">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => {
                  props.deleteTask(task.taskId)
                }}
              />
            </span>
          </div>
          <p className="font-light mt-2 text-xs">締め切り: {task.dueDate}</p>
        </div>
      ))}
    </ul>
  )
}

export default TaskList
