import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faAngleDown,
  faTrashCan,
  faTags,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import type { RootState } from '../stores/store'
import { deleteTask, updateTask, setTaskList } from '../stores/TaskListSlice'
import { setIsOpenLabelAdd } from '../stores/ModalSlice'
import type { Task } from '../types/Task'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import { validateClosingTask, validateReopeningTask } from '../functions/Task'
import { showNotification } from '@mantine/notifications'
import ChildrenTaskAdd from './ChildrenTaskAdd'
import { Checkbox } from '@mantine/core'

interface TaskListTaskProps {
  depth: Number
  task: Task
  searchString?: string
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

    //validation
    const res = status
      ? validateReopeningTask(props.task, deepCopy)
      : validateClosingTask(props.task, deepCopy)

    //notify if validation is successful
    if (!res.success) {
      showNotification({
        title: 'ステータスの更新に失敗しました',
        message: res.message,
        autoClose: 5000,
        color: 'red',
      })
      return
    }

    //update status if validation is successful
    const newTodos = deepCopy.map((todo) => {
      if (todo.taskId === taskId) {
        todo.status = !status
      }
      return todo
    })
    dispatch(setTaskList(newTodos))
    showNotification({
      message: 'ステータスの更新に成功しました',
      autoClose: 5000,
      color: 'green',
    })
  }

  const giveLabeltoTask = (add_label_id: string) => {
    const updateAssignLabelIdList = [
      ...props.task.assignLabelIdList,
      add_label_id,
    ]
    const newTask = {
      ...props.task,
      assignLabelIdList: updateAssignLabelIdList,
    }
    dispatch(updateTask(newTask))
  }

  const removeLabelFromTask = (remove_label_id: string) => {
    const updateAssignLabelIdList = [...props.task.assignLabelIdList].filter(
      (label_id) => label_id !== remove_label_id
    )
    const newTask = {
      ...props.task,
      assignLabelIdList: updateAssignLabelIdList,
    }
    dispatch(updateTask(newTask))
  }

  return (
    <div className="text-sub mb-10">
      <div
        className="bg-task border flex-col flex break-words mb-3 p-3 rounded-xl shadow-md	hover:shadow-inner hover:opacity-90"
        data-testid={`task-${props.task.taskId}`}
        key={props.task.taskId}
      >
        <div className="flex justify-between">
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
          <div>
            <span className="font-light text-s pr-5">
              締め切り: {props.task.dueDate}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          {/* タスク */}
          <span className=" text-3xl ml-5 font-semibold font-Shippori pt-4">
            {props.task.taskName}
          </span>
          <div className="flex justify-between">
            {/*edit task button*/}
            <TaskEdit task={props.task} />
            {/*add task button*/}
            <ChildrenTaskAdd parentTaskId={props.task.taskId} />
            {/*delete task button*/}
            <button
              className="m-3 p-2 hover:opacity-50"
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
              <span></span>
            </button>
            {/* ラベルレイアウト */}
            <div className="flex">
              {labelListSelector.labelList
                .filter((label) =>
                  props.task.assignLabelIdList.includes(label.id)
                )
                .map((label) => (
                  <div
                    key={label.id}
                    style={{ backgroundColor: label.color }}
                    className="p-1 m-1 rounded"
                  >
                    <span className="text-center w-20">{label.name}</span>
                    <span
                      className="pl-2  cursor-pointer"
                      onClick={() => {
                        removeLabelFromTask(label.id)
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </span>
                  </div>
                ))}
            </div>
            <Menu
              control={
                <button className="m-3 p-2 hover:opacity-50">
                  <span className="m-1 select-none hover:opacity-50">
                    <FontAwesomeIcon icon={faTags} />
                  </span>
                </button>
              }
            >
              {labelListSelector.labelList
                .filter(
                  (label) => !props.task.assignLabelIdList.includes(label.id)
                )
                .map((label) => (
                  <Menu.Item
                    key={label.id}
                    style={{
                      backgroundColor: label.color,
                    }}
                    onClick={() => {
                      giveLabeltoTask(label.id)
                    }}
                  >
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
      </div>
      {isOpenChildTaskList && !props.searchString ? (
        <TaskList
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
