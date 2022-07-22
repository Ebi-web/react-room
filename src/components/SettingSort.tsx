import type { FC } from 'react'
import type { SortKeySelectType, SortSettingProps } from '../types/SettingType'
import SettingSortSelectKey from './SettingSortSelectKey'
import SettingSortLabelPriority from './SettingSortLabelPriority'

const selectSortKeys: SortKeySelectType[] = [
  { value: 'none', label: '未設定' },
  { value: 'date:asc', label: '日付の昇順' },
  { value: 'label', label: 'ラベル順' },
]

const SettingSort: FC<SortSettingProps> = ({
  settingState,
  sortSettingEmitFunc,
}) => {
  return (
    <>
      <span className="m-2">ソート設定</span>
      <hr />
      <div className="m-5">
        <SettingSortSelectKey
          settingState={settingState}
          sortSettingEmitFunc={sortSettingEmitFunc}
          selectSortKeys={selectSortKeys}
        />
        {settingState.sortKeyType === 'label' ? (
          <SettingSortLabelPriority
            settingState={settingState}
            sortSettingEmitFunc={sortSettingEmitFunc}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default SettingSort
