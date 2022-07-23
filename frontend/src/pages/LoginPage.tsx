import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/API';

const LoginPage = (props: {
  authSetter: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const actionLogin = async () => {
    localStorage.setItem("token", await login(email, password));
    props.authSetter(true);
    navigate('/notes');
    
  }
  return (
    <Container>
      <Row>
        <Col xs={2} />
        <Col xs={6}>
          <Form className='mt-3'>
            <Form.Group>
              <Form.Control
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='my-2'
              />
              <Button
                variant='primary'
                onClick={actionLogin}
              >
                Войти
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={2} />
      </Row>
    </Container>
  )
}

export default LoginPage;