import { FC } from 'react'
import { useSelector } from 'react-redux'
import type { ParentTaskIdType } from '../types/Task'
import TaskListTask from './TaskListTask'
import { RootState } from '../stores/store'

interface TaskListProps {
  parentTaskId: ParentTaskIdType
  depth: Number
}

const TaskList: FC<TaskListProps> = (props) => {
  const taskListSelector = useSelector((state: RootState) => state.taskList)

  return (
    <ul className="ml-4">
      {taskListSelector.taskList
        .filter((task) => task.parentTaskId === props.parentTaskId)
        .map((task) => (
          <TaskListTask key={task.taskId} depth={props.depth} task={task} />
        ))}
    </ul>
  )
}

export default TaskList
