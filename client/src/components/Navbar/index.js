import React, { Fragment, useState } from 'react'
import {
  Collapse,
  Navbar as NavbarBootstrap,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'
import LoginModal from '../../pages/Homepage/components/LoginModal'


function Navbar () {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const openLoginModal = () => setIsOpenModal(true)
  const closeLoginModal = () => setIsOpenModal(false)
  return (
    <Fragment>
      <NavbarBootstrap className="fixed-true" color="dark" dark expand="md">
        <NavbarBrand href="/">GITHUB INFO</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className="flex-end" isOpen={isOpen} navbar>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
            </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
              </DropdownItem>
                <DropdownItem>
                  Option 2
              </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            <Button onClick={openLoginModal} outline color="primary">Login</Button>
          </NavbarText>
        </Collapse>
      </NavbarBootstrap>
      <LoginModal closeModal={closeLoginModal} isOpen={isOpenModal} />
    </Fragment>
  )
}
export default Navbar