import { FC } from 'react'
import { Navbar } from 'flowbite-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'

const Header: FC = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="#">
        <span className="m-2">
          <FontAwesomeIcon icon={faListCheck} />
        </span>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Jaguar(仮)
        </span>
      </Navbar.Brand>
    </Navbar>
  )
}

export default Header
