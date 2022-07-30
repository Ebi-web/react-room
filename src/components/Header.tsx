import { FC } from 'react'
import { Header as MantineHeader } from '@mantine/core'
import Setting from './Setting'

const Header: FC = () => {
  return (
    <MantineHeader height={60} p="xs">
      <span className="mr-5">Jaguar(仮)</span>
      <Setting />
    </MantineHeader>
  )
}

export default Header
