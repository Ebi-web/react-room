import { FC } from 'react'
import { Header as MantineHeader } from '@mantine/core'
import Setting from './Setting'

const Header: FC = () => {
  return (
    <MantineHeader
      height={80}
      p="xs"
      className="bg-main flex justify-between pl-7 pr-7"
    >
      <span className="mr-5 font-Cormorant font-medium text-4xl pt-2">
        Jaguar
      </span>
      <Setting />
    </MantineHeader>
  )
}

export default Header
