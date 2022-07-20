import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faAngleDown,
  faTrashCan,
  faTags,
} from '@fortawesome/free-solid-svg-icons'
import type { RootState } from '../stores/store'
import { deleteTask, setTaskList } from '../stores/TaskListSlice'
import { setIsOpenLabelAdd } from '../stores/ModalSlice'
import type { Task, Label } from '../types/Task'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import TaskAdd from './TaskAdd'

interface TaskListTaskProps {
  depth: Number
  task: Task
}

const TaskListTask: FC<TaskListTaskProps> = (props) => {
  const [isOpenChildTaskList, setIsOpenChildTaskList] = useState(false)
  const taskListSelector = useSelector((state: RootState) => state.taskList)
  const labelListSelector = useSelector((state: RootState) => state.labelList)
  const dispatch = useDispatch()

  const taskCount = taskListSelector.taskList.filter(
    (task) => props.task.taskId === task.parentTaskId
  )
  const taskDoneCount = taskCount
    .map((task) => task.status === true)
    .filter((status) => status).length

  const existChildTask = () => {
    return (
      taskListSelector.taskList.findIndex(
        (task) => task.parentTaskId === props.task.taskId
      ) >= 0
    )
  }

  const handleOnStatus = (taskId: string, status: boolean) => {
    const deepCopy = taskListSelector.taskList.map((todo) => ({ ...todo }))

    const newTodos = deepCopy.map((todo) => {
      if (todo.taskId === taskId) {
        todo.status = !status
      }
      return todo
    })

    dispatch(setTaskList(newTodos))
  }

  return (
    <div>
      <div
        className="border w-1/2 flex-col flex break-words mb-3 p-3 rounded-xl shadow-md	hover:shadow-inner"
        data-testid={`task-${props.task.taskId}`}
        key={props.task.taskId}
      >
        <div className="flex gap-6">
          <span
            className="pl-1 pr-1 select-none cursor-pointer hover:opacity-50"
            onClick={() => {
              setIsOpenChildTaskList(!isOpenChildTaskList)
            }}
          >
            <FontAwesomeIcon
              icon={isOpenChildTaskList ? faAngleDown : faAngleRight}
            />
          </span>
          <p className="select-none">
            {taskDoneCount}/{taskCount.length}
          </p>
          <input
            type="checkbox"
            checked={props.task.status}
            className="cursor-pointer mt-1"
            onChange={() =>
              handleOnStatus(props.task.taskId, props.task.status)
            }
          />
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold">{props.task.taskName}</span>
          <div className="flex justify-between">
            {/*edit task button*/}
            <TaskEdit task={props.task} />
            {/*add task button*/}
            <TaskAdd parentTaskId={props.task.taskId} />
            {/*delete task button*/}
            <button
              className="border-2 m-5 p-2 hover:opacity-50"
              onClick={() => {
                if (existChildTask()) {
                  console.error('小タスクが存在します')
                  alert('小タスクが存在します')
                } else {
                  dispatch(deleteTask(props.task.taskId))
                }
              }}
            >
              <span className="m-1 select-none hover:opacity-50">
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
              <span>削除</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="font-light mt-2 text-s">
            締め切り: {props.task.dueDate}
          </span>
          {/* ラベルレイアウト */}
          <div>ラベル1</div>
          <div>ラベル2</div>
          <Menu
            control={
              <button className="border-2 p-1 hover:opacity-50">
                <FontAwesomeIcon icon={faTags} />
                ラベル付け
              </button>
            }
          >
            {labelListSelector.labelList.map((label) => (
              <Menu.Item key={label.id} color={label.color} onClick={() => {}}>
                {label.name}
              </Menu.Item>
            ))}
            <Menu.Item
              onClick={() => {
                // open modal
                dispatch(setIsOpenLabelAdd(true))
              }}
            >
              ラベル追加
            </Menu.Item>
          </Menu>
        </div>
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
