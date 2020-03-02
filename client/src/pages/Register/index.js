import React from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import './style.scss'

function Register () {
  return (
    <Container className="register-container">
      <div className="register-wrapper">
        <Form className="register-form">
          <h3>Register</h3>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" placeholder="Please input github username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" placeholder="Please input password" />
          </FormGroup>
          <FormGroup className="flex space-between">
            <Button color="success">Register</Button>
            <Link className="btn-link" to="/login">Already have an account ?</Link>
          </FormGroup>
          <Link className="btn-link" to="/">Back to home</Link>
        </Form>
      </div>
    </Container>
  )
}

export default Register