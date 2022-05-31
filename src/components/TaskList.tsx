import { FC } from 'react'
import type { Task } from '../types/Task'
import TaskEdit from './TaskEdit'

interface TaskListProps {
  taskList: Task[]
  setTaskList: (taskList: Task[]) => void
}

const TaskList: FC<TaskListProps> = (props) => {
  return (
    <ul>
      {props.taskList.map((task) => (
        <div
          className="border w-1/2 flex-col flex break-words mb-3 p-3 rounded-xl shadow-md cursor-pointer	hover:shadow-inner"
          key={task.taskId}
        >
          <span className="text-xl font-semibold">{task.taskName}</span>
          <p className="font-light mt-2 text-xs">締め切り: {task.dueDate}</p>
          <TaskEdit task={task} setTaskList={props.setTaskList}></TaskEdit>
        </div>
      ))}
    </ul>
  )
}

export default TaskList
