import { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import SettingSort from './SettingSort'
import { getSortedTaskList } from '../functions/TaskListSort'
import type { SortKeyType, SettingState } from '../types/SettingType'
import { RootState } from '../stores/store'
import { setTaskList } from '../stores/TaskListSlice'
import { setSetting } from '../stores/SettingSlice'

const Setting: FC = () => {
  const [opened, setOpened] = useState(false)
  const dispatch = useDispatch()
  const settingSelector = useSelector((state: RootState) => state.setting)
  const taskListSelector = useSelector((state: RootState) => state.taskList)

  const [sortKeyTypeLocal, setSortKeyTypeLocal] = useState<SortKeyType>('none')
  const [sortPriorityLabelIdListLocal, setSortPriorityLabelIdListLocal] =
    useState<string[]>([])

  useEffect(() => {
    const preSortKeyType = settingSelector.sortKeyType
    setSortKeyTypeLocal(preSortKeyType)
    const preSortPriorityLabelIdList = settingSelector.sortPriorityLabelIdList
    setSortPriorityLabelIdListLocal(preSortPriorityLabelIdList)
  }, [])

  const sortSettingEmitFunc = ({
    sortKeyType,
    sortPriorityLabelIdList,
  }: SettingState) => {
    setSortKeyTypeLocal(sortKeyType)
    setSortPriorityLabelIdListLocal(sortPriorityLabelIdList)
  }

  const saveSortSetting = () => {
    const newSetting: SettingState = {
      sortKeyType: sortKeyTypeLocal,
      sortPriorityLabelIdList: sortPriorityLabelIdListLocal,
    }
    dispatch(setSetting(newSetting))

    const newTaskList = getSortedTaskList(
      taskListSelector.taskList,
      sortKeyTypeLocal,
      sortPriorityLabelIdListLocal
    )
    dispatch(setTaskList(newTaskList))

    showNotification({
      message: '設定保存に成功しました',
      autoClose: 5000,
      color: 'green',
    })
  }

  return (
    <>
      <button
        type="submit"
        className="border-2 p-2  hover:opacity-50 rounded-md shadow-md hover:shadow-none"
        onClick={() => setOpened(true)}
      >
        <FontAwesomeIcon icon={faGear} />
        <span className="pl-1">設定</span>
      </button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="設定"
        padding="xl"
        size="xl"
      >
        <SettingSort
          settingState={{
            sortKeyType: sortKeyTypeLocal,
            sortPriorityLabelIdList: sortPriorityLabelIdListLocal,
          }}
          sortSettingEmitFunc={sortSettingEmitFunc}
        />

        <div className="mt-10">
          <button
            className="border-2 p-2 rounded-md shadow-md hover:shadow-none"
            onClick={() => {
              saveSortSetting()
            }}
          >
            <span>設定する</span>
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default Setting
