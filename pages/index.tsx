import { useEffect, FC, ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setTaskList } from '../src/stores/TaskListSlice'
import { setLabelList } from '../src/stores/LabelListSlice'
import {
  getAllTaskListFromLocalStorage,
  getAllLabelListFromLocalStorage,
} from '../src/functions/localStorage'
import Header from '../src/components/Header'
import TaskAdd from '../src/components/TaskAdd'
import TaskClear from '../src/components/TaskClear'
import TaskList from '../src/components/TaskList'
import LabelAdd from '../src/components/LabelAdd'

const Index: FC<void> = () => {
  const [searchString, setSearchString] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const loadedTaskList = getAllTaskListFromLocalStorage()
    dispatch(setTaskList(loadedTaskList))
    const loadedLabelList = getAllLabelListFromLocalStorage()
    dispatch(setLabelList(loadedLabelList))
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

      <LabelAdd />
    </>
  )
}

export default Index
