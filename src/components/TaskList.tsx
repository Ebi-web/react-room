import { FC } from 'react'
import { useSelector } from 'react-redux'
import type { ParentTaskIdType } from '../types/Task'
import TaskListTask from './TaskListTask'
import { RootState } from '../stores/store'

interface TaskListProps {
  parentTaskId: ParentTaskIdType
  depth: Number // the depth of Nth level is N-1
  searchString?: string
}

const TaskList: FC<TaskListProps> = (props) => {
  const taskListSelector = useSelector((state: RootState) => state.taskList)

  // 検索時は階層表示しない
  return (
    <div>
      {props.searchString ? (
        <ul className="m-4">
          {taskListSelector.taskList
            .filter(
              (task) =>
                props.searchString &&
                task.taskName.indexOf(props.searchString) >= 0
            )
            .map((task) => (
              <TaskListTask
                key={task.taskId}
                depth={props.depth}
                task={task}
                searchString={props.searchString}
              />
            ))}
        </ul>
      ) : (
        <ul className="m-4">
          {taskListSelector.taskList
            .filter((task) => task.parentTaskId === props.parentTaskId)
            .map((task) => (
              <TaskListTask key={task.taskId} depth={props.depth} task={task} />
            ))}
        </ul>
      )}
    </div>
  )
}

export default TaskList
