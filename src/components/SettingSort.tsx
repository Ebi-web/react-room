import type { FC } from 'react'
import { Select } from '@mantine/core'
import type { SortKeyType } from '../types/SettingType'

interface SortSettingPropSetting {
  sortKeyType: SortKeyType
}

interface SortSettingProp extends SortSettingPropSetting {
  sortSettingEmitFunc: (setting: SortSettingPropSetting) => void
}

const selectSortKeys = [
  { value: 'none', label: '未設定' },
  { value: 'date:asc', label: '日付の昇順' },
  { value: 'label', label: 'ラベル順' },
]

const SettingSort: FC<SortSettingProp> = (props) => {
  const selectedSortKey = selectSortKeys.find(
    (select) => select.value === props.sortKeyType
  )
  const selectedSortKeyLabel = selectedSortKey
    ? selectedSortKey.label
    : '未設定'

  return (
    <>
      <span className="m-2">ソート設定</span>
      <hr />
      <div className="m-5">
        <Select
          label="ソート項目"
          data={selectSortKeys}
          placeholder={selectedSortKeyLabel}
          value={selectedSortKeyLabel}
          onChange={(value) => {
            if (!value) return
            props.sortSettingEmitFunc({ sortKeyType: value as SortKeyType })
          }}
        />
      </div>
    </>
  )
}

export default SettingSort
