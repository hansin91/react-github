import React from 'react'
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import './style.scss'

function Login () {
  const login = (e) => {
    e.preventDefault()
    console.log('here')
  }
  return (
    <Container className="login-container">
      <div className="login-wrapper">
        <Form onSubmit={(e) => login(e)} className="login-form">
          <h3>Login</h3>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" placeholder="Please input username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" placeholder="Please input password" />
          </FormGroup>
          <FormGroup className="flex space-between">
            <Button type="submit" color="success">Login</Button>
            <Link className="btn-link" to="/register">Please register here</Link>
          </FormGroup>
          <Link className="btn-link" to="/">Back to home</Link>
        </Form>
      </div>
    </Container>
  )
}

export default Login