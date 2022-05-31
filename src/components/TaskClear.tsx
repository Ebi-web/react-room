import { FC } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface TaskClearProps {
  clearTaskList: () => void
}

const TaskClear: FC<TaskClearProps> = (props) => {
  return (
    <button
      className="border-2 m-5 p-2 hover:opacity-50"
      onClick={props.clearTaskList}
    >
      <span>すべて削除</span>
      <span className="m-1">
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
    </button>
  )
}

export default TaskClear
