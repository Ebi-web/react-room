import { FC } from 'react'

interface TaskClearProps {
  clearTaskList: () => void
}

const TaskClear: FC<TaskClearProps> = (props) => {
  return (
    <button
      className="border-2 m-5 p-2"
      onClick={props.clearTaskList}
    >Clear</button>
  )
}

export default TaskClear