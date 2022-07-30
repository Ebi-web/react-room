import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { clearTaskList } from '../stores/TaskListSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const TaskClear: FC = () => {
  const dispatch = useDispatch()

  return (
    <button
      className="border-2 m-5 p-2 hover:opacity-50"
      onClick={() => dispatch(clearTaskList())}
    >
      <span className="m-1">
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
      <span>すべて削除</span>
    </button>
  )
}

export default TaskClear
