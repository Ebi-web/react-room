import { FC, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faAngleDown,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

import type { Task, DeleteTask } from '../types/Task'
import TaskList from './TaskList'

interface TaskListTaskProps {
  task: Task
  taskList: Task[]
  deleteTask: DeleteTask
}

const TaskListTask: FC<TaskListTaskProps> = (props) => {
  const [isOpenChildTaskList, setIsOpenChildTaskList] = useState(false)

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
                  console.log(`click plus ${props.task.taskId}`)
                }}
              />
            </span>
            <span className="m-1 select-none hover:opacity-50">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => {
                  props.deleteTask(props.task.taskId)
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
          deleteTask={props.deleteTask}
          parentTaskId={props.task.taskId}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default TaskListTask
