import { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { setTaskList } from '../src/stores/TaskListSlice'
import { setParentTaskId } from '../src/stores/TaskAddSlice'
import { getTaskListFromLocalStorage } from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'

const Index: FC<void> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadedTaskList = getTaskListFromLocalStorage()
    dispatch(setTaskList(loadedTaskList))
  }, [])

  return (
    <>
      <Header />

      <div>
        <TaskAdd />
      </div>

      <div className="flex">
        <button
          className="border-2 m-5 p-2 hover:opacity-50"
          onClick={() => dispatch(setParentTaskId(null))}
        >
          タスク追加の開発用：親タスクIDのリセット
        </button>

        <div>
          <TaskClear />
        </div>
      </div>

      <div className="ml-8">
        <TaskList parentTaskId={null} depth={0} />
      </div>
    </>
  )
}

export default Index
