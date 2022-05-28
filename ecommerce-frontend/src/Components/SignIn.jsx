import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import React from 'react'
import { Form,Button,Container, Alert } from 'react-bootstrap'
import { Link, useLocation, useNavigate, } from 'react-router-dom'
import { Store } from '../userContext'
import {  toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate()
    const {search,state} = useLocation()
    const rediractUrl = new URLSearchParams(search).get('rediract')
    const rediract = rediractUrl ? rediractUrl : '/'

  

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {state3,dispatch3} = useContext(Store)
    const {userInfo} = state3

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const {data} = await axios.post('/api/auth/signin',{
                email,
                password,
            })

             dispatch3({type: 'USER_SIGNIN', payload: data})
             localStorage.setItem('userInfo', JSON.stringify(data)) 
             navigate(rediract || '/')

        }catch(e){
            toast.error('Invalid Email or Password')
        }
    }

    // AFTER REGISTRATION, SHOW SUCCESS MASSAGE
    if(state){
        toast.success(state,{
            Limit:1
        })
    }
    //Done

    useEffect(()=>{
        if(userInfo){
            navigate(rediract)
        }
    },[])

  return (
    <Container className='w-25 border mt-5 p-3'>
        <Form onSubmit={handleSubmit}>
            <Alert variant='info' style={{textAlign:'center'}}>
                <h3>Login</h3>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" className='mb-3' onClick={handleSubmit}>
                Login
            </Button>
                <br/>
            <Form.Text className="text-muted">
               Don't Have An Account? <Link to={`/signUp?rediract=${rediract}`}>Create Account</Link>
            </Form.Text>
        </Form>
    </Container>
  )
}

export default SignIn