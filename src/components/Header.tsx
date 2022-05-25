import { FC } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'

const Header: FC = () => {
  return (
    <header className="p-5 bg-blue-300">
      <span className="m-2">
        <FontAwesomeIcon icon={faListCheck} />
      </span>
      <span className="items-center select-none">React ToDo test</span>
    </header>
  )
}

export default Header
