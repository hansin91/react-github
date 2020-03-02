import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
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

class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  render () {
    const toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }

    return (
      <Fragment>
        <NavbarBootstrap className="fixed-true" color="dark" dark expand="md">
          <NavbarBrand href="/">GITHUB INFO</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse className="flex-end" isOpen={this.state.isOpen} navbar>
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
              <Link to="/login">
                <Button outline color="primary">Login</Button>
              </Link>
            </NavbarText>
          </Collapse>
        </NavbarBootstrap>
      </Fragment>
    )
  }
}

export default Navbar