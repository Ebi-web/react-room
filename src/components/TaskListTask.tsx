import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faAngleDown,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { RootState } from '../stores/store'
import { deleteTask } from '../stores/TaskListSlice'
import { setParentTaskId } from '../stores/TaskAddSlice'
import type { Task } from '../types/Task'
import TaskList from './TaskList'

interface TaskListTaskProps {
  depth: Number
  task: Task
}

const TaskListTask: FC<TaskListTaskProps> = (props) => {
  const [isOpenChildTaskList, setIsOpenChildTaskList] = useState(false)
  const taskListSelector = useSelector((state: RootState) => state.taskList)
  const dispatch = useDispatch()

  const taskCount = taskListSelector.taskList.filter(
    (task) => props.task.taskId === task.parentTaskId
  ).length

  const existChildTask = () => {
    return taskListSelector.taskList.findIndex(
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
        <div className="flex gap-6">
          <span className="m-1 select-none hover:opacity-50">
            <FontAwesomeIcon
              icon={isOpenChildTaskList ? faAngleDown : faAngleRight}
              onClick={() => {
                setIsOpenChildTaskList(!isOpenChildTaskList)
              }}
            />
          </span>
          <p>0 / {taskCount}</p>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold">{props.task.taskName}</span>
          <div>
            <span className="m-1 select-none hover:opacity-50">
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => {
                  dispatch(setParentTaskId(props.task.taskId))
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
                    alert('小タスクが存在します')
                  } else {
                    dispatch(deleteTask(props.task.taskId))
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
        <>
          <TaskList
            parentTaskId={props.task.taskId}
            depth={Number(props.depth) + 1}
          />
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default TaskListTask
