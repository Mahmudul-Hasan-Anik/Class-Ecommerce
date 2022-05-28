import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { Form,Button,Container, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate, } from 'react-router-dom'
import { Store } from '../userContext'
import {  toast } from 'react-toastify';

const Registration = () => {
    const navigate = useNavigate()
    const {search} = useLocation()
    const rediractUrl = new URLSearchParams(search).get('rediract')
    const rediract = rediractUrl ? rediractUrl : '/'

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [conformPassword,setConformPassword] = useState('')

    const {state3,dispatch3} = useContext(Store)
    const {userInfo} = state3

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const {data} = await axios.post('/api/auth/signup',{
                name,
                email,
                password
            })

            navigate('/signin', {state:'Please Login For Containue...'})

        }catch(e){
            toast.error('Registration not successfull')
        }
    }


  return (
    <Container className='w-25 border mt-5 p-3'>
        <Form onSubmit={handleSubmit}>
            <Alert variant='info' style={{textAlign:'center'}}>
                <h3>Registration</h3>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} type="text" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} type="email" placeholder="Enter YOur Email" onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Conform Password</Form.Label>
                <Form.Control value={conformPassword} type="password" placeholder="Conform Password" onChange={(e)=>setConformPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" className='mb-3' onClick={handleSubmit}>
                Registration
            </Button>
                <br/>
            <Form.Text className="text-muted">
               Already Have An Account? <Link to={`/signin?rediract=${rediract}`}>Login</Link>
            </Form.Text>
        </Form>
    </Container>
  )
}

export default Registration