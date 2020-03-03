import React from 'react'
import { Modal, ModalFooter, Button, ModalHeader, ModalBody } from 'reactstrap'

function LoginModal (props) {
  // const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`
  return (
    <div>
      <Modal isOpen={props.isOpen} className="login-modal">
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          <Button color="primary" className="button-login-github" size="sm" block>
            <div className="button-login">
              <i className="fa fa-github" aria-hidden="true"></i>
              <p>
                <a className="anchor-login"> Login with github</a>
              </p>
            </div>
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}

export default LoginModal