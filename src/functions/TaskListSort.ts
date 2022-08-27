import { Task } from '../types/Task'
import type { SortKeyType } from '../types/SettingType'

export const getSortedTaskList = (
  taskList: Task[],
  sortKey: SortKeyType,
  sortPriorityLabelIdList: string[]
) => {
  const sortByString = (a: string, b: string) => (a >= b ? 1 : -1)
  if (sortKey === 'none') {
    return [...taskList].sort((a, b) => sortByString(a.taskId, b.taskId))
  }

  if (sortKey === 'date:asc') {
    return [...taskList].sort((a, b) => sortByString(a.dueDate, b.dueDate))
  }

  if (sortKey === 'label') {
    const sortByLabelPriority = (a: string[], b: string[]) => {
      // タスクに付与されているラベルのうち、もっとも優先順位の高いものを計算する
      // 無いならば、-1
      const labelPriorityIndexOfTaskA = sortPriorityLabelIdList.findIndex(
        (label_id) => a.includes(label_id)
      )
      const labelPriorityIndexOfTaskB = sortPriorityLabelIdList.findIndex(
        (label_id) => b.includes(label_id)
      )

      // 設定された優先順位のラベルがどちらも付与されていない場合、順番を維持する
      if (
        labelPriorityIndexOfTaskA === -1 &&
        labelPriorityIndexOfTaskB === -1
      ) {
        return 0
      }
      // 設定された優先順位のラベルがBのみ付与されている場合、Bを前にする
      if (labelPriorityIndexOfTaskA === -1) {
        return 1
      }
      // 設定された優先順位ののラベルがAのみふえる場合、Aを前にする
      if (labelPriorityIndexOfTaskB === -1) {
        return -1
      }

      // taskBのほうが優先順位の高いラベルが付与されているので、taskAを後ろにしたい
      if (labelPriorityIndexOfTaskA > labelPriorityIndexOfTaskB) {
        return 1
      }
      // taskAのほうが優先順位の高いラベルが付与されているので、taskBを後ろにしたい
      if (labelPriorityIndexOfTaskA < labelPriorityIndexOfTaskB) {
        return -1
      }
      // 維持する
      return 0
    }
    return [...taskList].sort((a, b) =>
      sortByLabelPriority(a.assignLabelIdList, b.assignLabelIdList)
    )
  }

  if (sortKey === 'status') {
    //sort undone first
    return [...taskList].sort((a, b) => {
      if (!a.status && b.status) {
        return -1
      }
      if (a.status && !b.status) {
        return 1
      }
      return 0
    })
  }

  return [...taskList]
}
