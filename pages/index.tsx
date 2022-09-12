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
    <div className="bg-white min-h-screen">
      <Header />

      <div className="flex justify-between mr-10 ml-3 sm:flex-col">
        <div className="flex mt-3">
          <div>
            <TaskClear />
          </div>
          <div>
            <TaskAdd parentTaskId={null} />
          </div>
        </div>

        <form className="sm:ml-5">
          <input
            type="text"
            className=" w-80 my-8 rounded-lg border-2 border-black"
            placeholder="search"
            onChange={(e) => setSearchString(e.target.value)}
          />
        </form>
      </div>

      <div className=" mx-8 mt-8">
        <TaskList parentTaskId={null} depth={0} searchString={searchString} />
      </div>

      <LabelAdd />
    </div>
  )
}

export default Index
