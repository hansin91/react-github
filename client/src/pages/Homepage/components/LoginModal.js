import React from 'react'
import { Modal, ModalFooter, Button, ModalHeader, ModalBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, fetchUsers } from '../../../actions'


function LoginModal (props) {
  const dispatch = useDispatch()
  const loginGithub = () => dispatch(login())
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // console.log(isAuthenticated)
  // const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`
  return (
    <div>
      <Modal isOpen={props.isOpen} className="login-modal">
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Button onClick={loginGithub} color="primary" className="button-login-github" size="sm" block>
            <div className="button-login">
              <i className="fa fa-github" aria-hidden="true"></i>
              <p>
                <span className="anchor-login"> Login with github</span>
              </p>
            </div>
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default LoginModal