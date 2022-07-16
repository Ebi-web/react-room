import { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Drawer } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import SettingSort from './SettingSort'
import type { SortKeyType } from '../types/SettingType'
import { RootState } from '../stores/store'
import { setSetting } from '../stores/SettingSlice'

interface SortSettingPropSetting {
  sortKeyType: SortKeyType
}

const Setting: FC = () => {
  const [opened, setOpened] = useState(false)
  const dispatch = useDispatch()
  const settingSelector = useSelector((state: RootState) => state.setting)

  const [sortKeyTypeLocal, setSortKeyTypeLocal] = useState<SortKeyType>('none')

  useEffect(() => {
    const preSortKeyType = settingSelector.sortKeyType
    setSortKeyTypeLocal(preSortKeyType)
  }, [])

  const sortSettingEmitFunc = ({ sortKeyType }: SortSettingPropSetting) => {
    setSortKeyTypeLocal(sortKeyType)
  }

  const saveSortSetting = () => {
    const newSetting = {
      sortKeyType: sortKeyTypeLocal,
    }
    dispatch(setSetting(newSetting))
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
        className="border-2 p-2 rounded-md shadow-md hover:shadow-none"
        onClick={() => setOpened(true)}
      >
        <span>設定を開く</span>
      </button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="設定"
        padding="xl"
        size="xl"
      >
        <SettingSort
          sortKeyType={sortKeyTypeLocal}
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
