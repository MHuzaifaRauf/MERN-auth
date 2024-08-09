import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice.js'
import { useUpdateUserMutation } from '../store/slices/usersApiSlice.js'

import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer.jsx'
import Loader from '../components/Loader.jsx'

const ProfilePage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.setName, userInfo.email])

  const submitHandler = async (e) => {
    e.preventDefault()
    // Send request to backend to authenticate user
    if (password!== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      console.log("Submit");
    }
  }

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control 
            type='name' 
            placeholder='Enter Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>
            Confirm Password
          </Form.Label>
          <Form.Control 
            type='password' 
            placeholder='Re-Enter Password' 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

      </Form>
    </FormContainer>
  )
}

export default ProfilePage