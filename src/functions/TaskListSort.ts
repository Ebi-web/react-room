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
      const reversedPriorityLabelIdList = [...sortPriorityLabelIdList].reverse()
      // タスクに付与されているラベルのうち、もっとも優先順位の高いものを計算する
      // 無いならば、-1
      const labelPriorityIndexOfTaskA = reversedPriorityLabelIdList.findIndex(
        (label_id) => a.includes(label_id)
      )
      const labelPriorityIndexOfTaskB = reversedPriorityLabelIdList.findIndex(
        (label_id) => b.includes(label_id)
      )

      // a, bでどちらが先に来るべきか計算する
      return labelPriorityIndexOfTaskB - labelPriorityIndexOfTaskA
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
