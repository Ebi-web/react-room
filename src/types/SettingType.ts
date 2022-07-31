export type SortKeyType = 'none' | 'date:asc' | 'label' | 'status'

export type SortKeyTypeLabel =
  | '未設定'
  | '日付の昇順'
  | 'ラベル順'
  | '完了ステータス順'

export type SortKeySelectType = {
  value: SortKeyType
  label: SortKeyTypeLabel
}

export type SettingState = {
  sortKeyType: SortKeyType
  sortPriorityLabelIdList: string[]
}

export type SortSettingProps = {
  settingState: SettingState
  sortSettingEmitFunc: (setting: SettingState) => void
}
