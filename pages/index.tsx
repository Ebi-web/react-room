import { useEffect, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
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
import { TaskCalenderList } from '../src/components/TaskCalenderList'

const Index: FC<void> = () => {
  const [searchString, setSearchString] = useState('')
  const dispatch = useDispatch()
  const [isCalenderView, setIsCalenderView] = useState<boolean>(false)

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

        <div className="flex mt-8">
          {/** switch calender */}
          <Button
            variant="outline"
            color="dark"
            radius="md"
            size="md"
            className="w-60 border-2 p-2 mr-4 text-center"
            onClick={() => {
              setIsCalenderView(!isCalenderView)
            }}
          >
            <FontAwesomeIcon icon={faCalendar} className="m-1" />
            {isCalenderView ? 'リスト' : 'カレンダー'}表示に切り替え
          </Button>

          {/** Search */}
          <form className="sm:ml-5">
            <input
              type="text"
              className="w-80 rounded-lg border-2 border-black"
              placeholder="search"
              onChange={(e) => setSearchString(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="mx-8 mt-8">
        {isCalenderView ? (
          <TaskCalenderList />
        ) : (
          <TaskList parentTaskId={null} depth={0} searchString={searchString} />
        )}
      </div>

      <LabelAdd />
    </div>
  )
}

export default Index
