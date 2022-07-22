import { FC } from 'react'
import { Select } from '@mantine/core'
import type {
  SortKeySelectType,
  SettingState,
  SortSettingProps,
} from '../types/SettingType'

interface SortKeySettingProps extends SortSettingProps {
  selectSortKeys: SortKeySelectType[]
}

const SettingSortSelectKey: FC<SortKeySettingProps> = ({
  settingState,
  sortSettingEmitFunc,
  selectSortKeys,
}) => {
  const selectedSortKey = selectSortKeys.find(
    (select) => select.value === settingState.sortKeyType
  )
  const selectedSortKeyLabel = selectedSortKey
    ? selectedSortKey.label
    : '未設定'

  return (
    <>
      <Select
        label="ソート項目"
        data={selectSortKeys}
        placeholder={selectedSortKeyLabel}
        value={selectedSortKeyLabel}
        onChange={(value) => {
          if (!value) return
          sortSettingEmitFunc({
            sortKeyType: value,
            sortPriorityLabelIdList: settingState.sortPriorityLabelIdList,
          } as SettingState)
        }}
      />
    </>
  )
}

export default SettingSortSelectKey
