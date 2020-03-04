import React, { Fragment, useState } from 'react'
import {
  Input,
  Collapse,
  Navbar as NavbarBootstrap,
  NavbarToggler,
  Nav,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Form,
  Col,
  FormGroup
} from 'reactstrap'
import LoginModal from '../../pages/Homepage/components/LoginModal'
import './style.scss'
import { Link, useHistory, useLocation } from "react-router-dom"



function Navbar () {
  const useQuery = () => {
    return (new URLSearchParams(useLocation().search))
  }
  const queryParam = useQuery()
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [query, setQuery] = useState(queryParam.get("query") ? queryParam.get("query") : '')
  const [type, setType] = useState(queryParam.get("type") ? queryParam.get("type") : 'user')
  const openLoginModal = () => setIsOpenModal(true)
  const closeLoginModal = () => setIsOpenModal(false)
  let history = useHistory()
  const searchData = (event) => {
    event.preventDefault()
    history.push({
      pathname: '/search',
      search: '?query=' + query + '&type=' + type,
      state: { isLoading: true }
    })
  }

  const handleInputSearch = (event) => {
    setQuery(event.target.value)
  }

  const handleSelectType = (event) => {
    setType(event.target.value)
  }

  return (
    <Fragment>
      <NavbarBootstrap className="fixed-true" color="dark" dark expand="md">
        <Link to="/">
          <span className="navbar-brand">GITHUB INFO</span>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Form onSubmit={(event) => searchData(event)} className="form-search">
          <FormGroup className="mb-0" row>
            <Col sm={5}>
              <Input type="select" defaultValue={queryParam.get("type")} required onChange={(event) => handleSelectType(event)} name="type">
                <option value="user">User</option>
                <option value="repo">Repository</option>
              </Input>
            </Col>
            <Col sm={7}>
              <Input type="text" defaultValue={queryParam.get("query")} required onKeyUp={(event) => handleInputSearch(event)} name="user" placeholder="Search" />
            </Col>
          </FormGroup>
        </Form>
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