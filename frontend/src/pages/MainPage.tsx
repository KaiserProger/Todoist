import GoogleLogin from '@leecheuk/react-google-login'
import React from 'react'
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate();
  const google = (response: any) => {
    console.log(response);
  }
  return (
    <Container>
      <Row>
        <Col xs={5} />
        <Col xs={4} className='d-flex align-items-center'>
          <ButtonGroup vertical>
            <Button variant='primary' onClick={() => navigate('/login')} className='my-4'>
              Я уже вайтишник
            </Button>
            <Button variant='success' onClick={() => navigate('/register')} className='mb-4'>
              Войти в IT
            </Button>
            <GoogleLogin
              onSuccess={google}
              onFailure={google}
              buttonText='Войти через Google'
              clientId='793997044692-5eln7ev8iqaq8qh434r584s7m3glh7sd.apps.googleusercontent.com'
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default MainPage