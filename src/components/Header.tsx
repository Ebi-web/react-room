import { FC } from 'react'
import {Navbar} from "flowbite-react";

const Header: FC = () => {
  return (
    <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="#">
        {/*<img*/}
        {/*  src="#"*/}
        {/*  className="mr-3 h-6 sm:h-9"*/}
        {/*  alt="Jaguar Logo"*/}
        {/*/>*/}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      Jaguar(仮)
    </span>
      </Navbar.Brand>
    </Navbar>
  )
}

export default Header
