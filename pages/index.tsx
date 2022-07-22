import { useEffect, FC, ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTaskList } from '../src/stores/TaskListSlice'
import { getAllTaskListFromLocalStorage } from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'

const Index: FC<void> = () => {
  const [searchString, setSearchString] = useState('')
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
        <form action="" className="flex justify-center">
          <input
            type="text"
            className="my-8 rounded border border-black"
            placeholder="search"
            onChange={(e) => setSearchString(e.target.value)}
          />
        </form>
      </div>

      <div className="ml-8">
        <TaskList parentTaskId={null} depth={0} searchString={searchString} />
      </div>
    </>
  )
}

export default Index
