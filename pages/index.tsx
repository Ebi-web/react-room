import { useEffect, FC } from 'react'
import { useDispatch } from 'react-redux'
import { setTaskList } from '../src/stores/TaskListSlice'
import { getAllTaskListFromLocalStorage } from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'
import LabelAdd from '../src/components/LabelAdd'

const Index: FC<void> = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loadedTaskList = getAllTaskListFromLocalStorage()
    dispatch(setTaskList(loadedTaskList))
  }, [])

  return (
    <>
      <Header />

      <div className="flex">
        <div>
          <TaskClear />
        </div>
        <div>
          <TaskAdd parentTaskId={null} />
        </div>
      </div>

      <div className="ml-8">
        <TaskList parentTaskId={null} depth={0} />
      </div>

      <LabelAdd />
    </>
  )
}

export default Index
