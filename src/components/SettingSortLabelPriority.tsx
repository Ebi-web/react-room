import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { Menu } from '@mantine/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import type { SortSettingProps } from '../types/SettingType'
import type { RootState } from '../stores/store'

const SettingSortLabelPriority: FC<SortSettingProps> = ({
  settingState,
  sortSettingEmitFunc,
}) => {
  const labelListSelector = useSelector((state: RootState) => state.labelList)

  return (
    <>
      <div className="p-3">
        <div className="m-2">ラベル順設定</div>
        <Menu
          control={
            <button className="border-2 p-1 hover:opacity-50">
              <span className="p-1">ソート対象ラベル追加</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          }
        >
          {labelListSelector.labelList
            .filter(
              (label) =>
                !settingState.sortPriorityLabelIdList.includes(label.id)
            )
            .map((label) => (
              <Menu.Item
                key={label.id}
                style={{
                  backgroundColor: label.color,
                }}
                onClick={() => {
                  sortSettingEmitFunc({
                    ...settingState,
                    sortPriorityLabelIdList: [
                      ...settingState.sortPriorityLabelIdList,
                      label.id,
                    ],
                  })
                }}
              >
                {label.name}
              </Menu.Item>
            ))}
        </Menu>
        <div>
          {settingState.sortPriorityLabelIdList
            .map((label_id) =>
              labelListSelector.labelList.find((label) => label.id === label_id)
            )
            .map((label) =>
              label ? (
                <div
                  key={label.id}
                  style={{ backgroundColor: label.color }}
                  className="p-1 m-1 rounded flex justify-between"
                >
                  <span className="text-center w-20">{label.name}</span>
                  <span
                    className="pl-2  cursor-pointer"
                    onClick={() => {
                      sortSettingEmitFunc({
                        ...settingState,
                        sortPriorityLabelIdList: [
                          ...settingState.sortPriorityLabelIdList,
                        ].filter((label_id) => label.id !== label_id),
                      })
                    }}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
                </div>
              ) : (
                ''
              )
            )}
        </div>
      </div>
    </>
  )
}

export default SettingSortLabelPriority
