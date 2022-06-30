import React,{useContext, useState} from 'react'
import { Form,Button,Container, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Store } from '../userContext'

const AdminSignIn = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {adminState,adminDispatch} = useContext(Store)

    console.log(adminState)

    const handleSubmit = async(e)=>{
        e.preventDefault()

        try{
            const {data} = await axios.post('/api/auth/adminsignin',{
                email,
                password,
            })

            adminDispatch({type: 'ADMIN_USER_LOGIN', payload: data})
            localStorage.setItem('adminUser', JSON.stringify(data))
            navigate('/admin')
            
        }catch(e){
            console.log(e)
        }
    }

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

            <Button variant="primary" type="submit" className='mb-3' onClick={handleSubmit} style={{width:'100%'}}>
                Login
            </Button>
        </Form>
    </Container>
  )
}

export default AdminSignIn