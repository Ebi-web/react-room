import { FC, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faAngleDown,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

import type { Task } from '../types/Task'
import { TaskAddParentIdContext } from '../hooks/TaskAddHooks'
import { TaskListContext } from '../hooks/TaskListHooks'
import TaskList from './TaskList'

interface TaskListTaskProps {
  depth: Number
  task: Task
  taskList: Task[]
}

const TaskListTask: FC<TaskListTaskProps> = (props) => {
  const [isOpenChildTaskList, setIsOpenChildTaskList] = useState(false)
  const { setTaskAddParentId } = useContext(TaskAddParentIdContext)
  const { taskListDispatch } = useContext(TaskListContext)

  const existChildTask = () => {
    return props.taskList.findIndex(
      (task) => task.parentTaskId === props.task.taskId
    ) >= 0
      ? true
      : false
  }

  return (
    <div>
      <div
        className="border w-1/2 flex-col flex break-words mb-3 p-3 rounded-xl shadow-md cursor-pointer	hover:shadow-inner"
        data-testid={`task-${props.task.taskId}`}
        key={props.task.taskId}
      >
        <span className="m-1 select-none hover:opacity-50">
          <FontAwesomeIcon
            icon={isOpenChildTaskList ? faAngleDown : faAngleRight}
            onClick={() => {
              setIsOpenChildTaskList(!isOpenChildTaskList)
            }}
          />
        </span>
        <div className="flex justify-between">
          <span className="text-xl font-semibold">{props.task.taskName}</span>
          <div>
            <span className="m-1 select-none hover:opacity-50">
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => {
                  setTaskAddParentId(props.task.taskId)
                }}
              />
            </span>
            <span className="m-1 select-none hover:opacity-50">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => {
                  if (existChildTask()) {
                    // TODO:ユーザーへの通知実装
                    console.error('小タスクが存在します')
                  } else {
                    taskListDispatch({
                      command: 'DELETE_TASK',
                      value: props.task.taskId,
                    })
                  }
                }}
              />
            </span>
          </div>
        </div>
        <p className="font-light mt-2 text-xs">
          締め切り: {props.task.dueDate}
        </p>
      </div>
      {isOpenChildTaskList ? (
        <TaskList
          taskList={props.taskList}
          parentTaskId={props.task.taskId}
          depth={Number(props.depth) + 1}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default TaskListTask
