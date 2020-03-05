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
import { Link, useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import LoginModal from '../../pages/Homepage/components/LoginModal'
import { logout } from '../../actions'
import './style.scss'



function Navbar () {
  const dispatch = useDispatch()
  const userLogout = () => dispatch(logout())

  const useQuery = () => {
    return (new URLSearchParams(useLocation().search))
  }
  const query = useQuery()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [keyword, setKeyword] = useState(query.get("q") ? query.get("q") : '')
  const [type, setType] = useState(query.get("type") ? query.get("type") : 'user')
  const [page] = useState(1)
  const openLoginModal = () => setIsOpenModal(true)
  const closeLoginModal = () => setIsOpenModal(false)
  let history = useHistory()
  const searchData = (event) => {
    event.preventDefault()
    history.push({
      pathname: '/search',
      search: '?q=' + keyword + '&type=' + type + '&page=' + page,
      state: { keyword, type, page }
    })
  }

  const handleInputSearch = (event) => {
    setKeyword(event.target.value)
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
              <Input type="select"
                defaultValue={query.get("type")}
                required
                onChange={(event) => handleSelectType(event)}
                name="type">
                <option value="user">User</option>
                <option value="repo">Repository</option>
              </Input>
            </Col>
            <Col sm={7}>
              <Input type="text"
                defaultValue={query.get("q")}
                required
                onChange={(event) => handleInputSearch(event)}
                name="user"
                placeholder="Search" />
            </Col>
          </FormGroup>
        </Form>
        <Collapse className="flex-end" isOpen={isOpen} navbar>
          {isAuthenticated &&
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <span className="navbar-profile">
                    {user.username}
                    <img className="img-fluid d-block w-100" src={user.avatar_url} alt={user.username} />
                  </span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem>
                    <span onClick={userLogout}>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          }
          <NavbarText>
            {!isAuthenticated
              && <Button onClick={openLoginModal} outline color="primary">Login</Button>}
          </NavbarText>
        </Collapse>
      </NavbarBootstrap>
      <LoginModal closeModal={closeLoginModal} isOpen={isOpenModal} />
    </Fragment>
  )
}
export default Navbar