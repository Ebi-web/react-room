import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Group, Modal, TextInput, ColorPicker } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { getNewLabel } from '../functions/Label'
import type { RootState } from '../stores/store'
import { setIsOpenLabelAdd } from '../stores/ModalSlice'

interface LabelAddProps {}

const swatches = [
  '#25262b',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
]

const LabelAddModal: FC<LabelAddProps> = () => {
  const [inputLabelName, setInputLabelName] = useState('')
  const [inputColorHex, setInputColorHex] = useState('#000000')

  const modalSelector = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const addLabel = () => {
    const newLabel = getNewLabel({
      labelName: inputLabelName,
      labelColor: inputColorHex,
    })

    // add label to global state

    // close modal
    dispatch(setIsOpenLabelAdd(false))

    showNotification({
      message: 'ラベルの追加に成功しました',
      autoClose: 5000,
      color: 'green',
    })
  }

  return (
    <>
      <Modal
        centered
        opened={modalSelector.isOpenLabelAdd}
        onClose={() => {
          dispatch(setIsOpenLabelAdd(false))
        }}
        title="ラベルを追加"
      >
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={() => addLabel()}>
            <TextInput
              label="ラベル名"
              value={inputLabelName}
              onChange={(e) => setInputLabelName(e.target.value)}
            />

            <span>ラベル背景色</span>
            <Group position="center">
              <ColorPicker
                format="hex"
                value={inputColorHex}
                swatches={swatches}
                onChange={(e) => {
                  setInputColorHex(e)
                }}
              />
            </Group>

            <Group position="right" mt="md">
              <button
                type="submit"
                className="border-2 m-5 p-2 rounded-md shadow-md hover:shadow-none"
              >
                <span className="m-1">追加</span>
              </button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default LabelAddModal
