import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../store/slices/usersApiSlice.js'
import { setCredentials } from '../store/slices/authSlice.js'

import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer.jsx'
import Loader from '../components/Loader.jsx'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    // Send request to backend to authenticate user
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({...res}));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>
            Email Address
          </Form.Label>
          <Form.Control 
            type='email' 
            placeholder='Enter Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Enter Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        { isLoading && <Loader />}

        <Button type='submit' variant='primary' className='mt-3'>
          Sign In
        </Button>

        <Row className='py-3'>
          <Col>
            New Here ? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginPage