import { useEffect, FC, ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTaskList } from '../src/stores/TaskListSlice'
import { getAllTaskListFromLocalStorage } from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'

const Index: FC<void> = () => {
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadedTaskList = getAllTaskListFromLocalStorage()
    dispatch(setTaskList(loadedTaskList))
  }, [])

  useEffect(() => {
    if (search.length > 0) {
      setIsSearch(false)
    } else {
      setIsSearch(true)
    }
  }, [search])

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
            className="my-8  rounded border border-black"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="ml-8">
        <TaskList
          parentTaskId={null}
          depth={0}
          search={search}
          isSearch={isSearch}
        />
      </div>
    </>
  )
}

export default Index
