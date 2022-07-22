import type { Label } from '../types/Task'
import { ulid } from 'ulid'

interface GetNewLabelParams {
  labelName: string
  labelColor: string
}

export const getNewLabel = ({
  labelName,
  labelColor,
}: GetNewLabelParams): Label => {
  if (labelName === '') {
    throw new Error('ラベル名を入力してください')
  }
  const colorRegex = new RegExp(/^#[0-9a-f]{6}$/)
  if (!colorRegex.test(labelColor)) {
    throw new Error('ラベル色フォーマットが正しくありません')
  }

  return {
    id: ulid(),
    name: labelName,
    color: labelColor,
  }
}
