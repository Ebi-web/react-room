import { FC, useContext } from 'react'
import { TaskListContext } from '../hooks/TaskListHooks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const TaskClear: FC<{}> = () => {
  const { taskListDispatch } = useContext(TaskListContext)
  return (
    <button
      className="border-2 m-5 p-2 hover:opacity-50"
      onClick={() =>
        taskListDispatch({
          command: 'CLEAR_TASKLIST',
        })
      }
    >
      <span>すべて削除</span>
      <span className="m-1">
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
    </button>
  )
}

export default TaskClear
