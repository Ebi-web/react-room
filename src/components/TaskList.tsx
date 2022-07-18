import { FC } from 'react'
import { useSelector } from 'react-redux'
import type { ParentTaskIdType } from '../types/Task'
import TaskListTask from './TaskListTask'
import { RootState } from '../stores/store'

interface TaskListProps {
  parentTaskId: ParentTaskIdType
  depth: Number // the depth of Nth level is N-1
  search?: any
  isSearch?: boolean
}

const TaskList: FC<TaskListProps> = (props) => {
  const taskListSelector = useSelector((state: RootState) => state.taskList)

  return (
    <div>
      {props.isSearch ? (
        <ul className="ml-4">
          {taskListSelector.taskList
            .filter((task) => task.parentTaskId === props.parentTaskId)
            .map((task) => (
              <TaskListTask
                key={task.taskId}
                depth={props.depth}
                task={task}
                searchNow={false}
              />
            ))}
        </ul>
      ) : (
        <ul className="ml-4">
          {taskListSelector.taskList
            .filter((task) => !task.taskName.indexOf(props.search))
            .map((task) => (
              <TaskListTask
                key={task.taskId}
                depth={props.depth}
                task={task}
                searchNow={true}
              />
            ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
