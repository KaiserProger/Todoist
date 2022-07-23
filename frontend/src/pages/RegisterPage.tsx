import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { register } from '../api/API';

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const actionRegister = async () => {
    await register({name, email, password});
    navigate('/');
  }
  return (
    <Container>
      <Row>
        <Col xs={3} />
        <Col xs={6}>
          <Form>
            <Form.Group>
            <Form.Control
                placeholder='Name...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Control
                placeholder='Email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Control
                placeholder='Password...'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              ></Form.Control>
              <Button variant='primary'
                onClick={() => actionRegister()}>Зарегистрироваться</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage;