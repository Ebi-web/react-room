import { FC } from 'react'
import type { ParentTaskIdType, Task } from '../types/Task'
import TaskListTask from './TaskListTask'

interface TaskListProps {
  taskList: Task[]
  parentTaskId: ParentTaskIdType
  depth: Number
}

const TaskList: FC<TaskListProps> = (props) => {
  return (
    <ul className="ml-4">
      {props.taskList
        .filter((task) => task.parentTaskId === props.parentTaskId)
        .map((task) => (
          <TaskListTask
            key={task.taskId}
            depth={props.depth}
            task={task}
            taskList={props.taskList}
          />
        ))}
    </ul>
  )
}

export default TaskList
