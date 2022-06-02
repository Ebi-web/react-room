import { FC } from 'react'
import type { ParentTaskId, Task, DeleteTask } from '../types/Task'
import TaskListTask from './TaskListTask'

interface TaskListProps {
  taskList: Task[]
  parentTaskId: ParentTaskId
  depth: Number
  deleteTask: DeleteTask
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
            deleteTask={props.deleteTask}
          />
        ))}
    </ul>
  )
}

export default TaskList
