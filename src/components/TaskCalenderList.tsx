import { FC, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../stores/store'
import dayjs from 'dayjs'
import Draggable from 'react-draggable'
import { showNotification } from '@mantine/notifications'
import { updateTask } from '../stores/TaskListSlice'
import type { Task } from '../types/Task'
import { DateFormat, validateTask } from '../functions/Task'

export const TaskCalenderList: FC = () => {
  const taskListSelector = useSelector((state: RootState) => state.taskList)

  const dateLength = 100
  const dateArray = new Array(dateLength)
    .fill('')
    .map((_, i) => dayjs().add(i, 'day'))

  return (
    <div className="overflow-x-scroll">
      <div className="flex">
        {dateArray.map((date, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-4 m-2 text-xl text-center"
          >
            {date.get('date') === 1 ? <b>{date.get('month') + 1}</b> : ''}
          </div>
        ))}
      </div>
      <div className="flex">
        {dateArray.map((date, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-4 m-2 text-xl text-center ${
              [0, 6].includes(date.get('day')) ? 'text-red-500' : ''
            }`}
          >
            <span>{date.get('date')}</span>
          </div>
        ))}
      </div>
      {taskListSelector.taskList.map((task) => (
        <CalenderListTask key={task.taskId} task={task} />
      ))}
    </div>
  )
}

type Props = {
  task: Task
}

const CalenderListTask: FC<Props> = ({ task }) => {
  const CALEMDER_DATE_WIDTH = 32
  const [startX, setStartX] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0)
  const nodeRef = useRef(null)

  useEffect(() => {
    const newMarginLeft =
      Math.max(dayjs(task.startDate).diff(dayjs(new Date()), 'day') + 1, 0) *
      CALEMDER_DATE_WIDTH
    setMarginLeft(newMarginLeft)
  }, [task.startDate])

  const handleStart = (e: any) => {
    setStartX(e.screenX)
  }
  const handleStop = (e: any) => {
    const diffDays = (e.screenX - startX) / CALEMDER_DATE_WIDTH
    updateTaskLocal(diffDays)
  }

  const dispatch = useDispatch()

  const updateTaskLocal = (diffDays: number) => {
    const newStartDate = dayjs(task.startDate)
      .add(diffDays, 'day')
      .format(DateFormat)
    const newDueDate = dayjs(task.dueDate)
      .add(diffDays, 'day')
      .format(DateFormat)
    const newTask: Task = {
      ...task,
      startDate: newStartDate,
      dueDate: newDueDate,
    }

    const msg = validateTask(newTask)
    if (msg) {
      showNotification({
        title: 'タスクの編集に失敗しました',
        message: msg,
        autoClose: 5000,
        color: 'red',
      })
      return
    }

    dispatch(updateTask(newTask))
    showNotification({
      message: 'タスクの編集に成功しました',
      autoClose: 5000,
      color: 'green',
    })
  }

  return (
    <Draggable
      axis={'x'}
      grid={[CALEMDER_DATE_WIDTH, 0]}
      onStart={(e: any) => {
        handleStart(e)
      }}
      defaultPosition={{ x: 0, y: 0 }}
      position={{ x: 0, y: 0 }}
      onStop={(e: any) => {
        handleStop(e)
      }}
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        className="bg-task border mt-2 p-2 rounded-xl cursor-pointer shadow-md	hover:shadow-inner hover:opacity-90"
        style={{
          marginLeft: `${marginLeft}px`,
          width: `${
            (dayjs(task.dueDate).diff(dayjs(task.startDate), 'day') + 1) *
            CALEMDER_DATE_WIDTH
          }px`,
        }}
      >
        <div>
          {dayjs(task.dueDate).diff(dayjs(task.startDate), 'day') + 1 <= 3
            ? `${task.startDate.substring(5, 10)} ~ ${task.dueDate.substring(
                5,
                10
              )}`
            : `${task.startDate} ~ ${task.dueDate}`}
        </div>
        <div>
          <b>{task.taskName}</b>
        </div>
      </div>
    </Draggable>
  )
}
