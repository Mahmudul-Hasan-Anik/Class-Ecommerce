import React,{useContext, useState,useEffect} from 'react'
import { Helmet } from 'react-helmet-async';
import { Container,Form,Button, Alert } from 'react-bootstrap';
import { Store } from '../userContext';
import { useNavigate } from 'react-router-dom';
import CheckOut from './CheckOut';

const Shipping = () => {
    const {state4, dispatch4,state3} = useContext(Store)
    const nagivate = useNavigate()

    const [name, setName] = useState(state4.shipping.name || '')
    const [address, setAddress] = useState(state4.shipping.address || '')
    const [city, setCity] = useState(state4.shipping.city || '')
    const [post, setPost] = useState(state4.shipping.post || '')
    const [country, setCountry] = useState(state4.shipping.country || '')

    
     const {userInfo} = state3

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch4({
            type: 'SHIPPING_PAGE',
            payload:{
                name,
                address,
                city,
                post,
                country
            }
        })
        localStorage.setItem('shipping',JSON.stringify({
            name,
            address,
            city,
            post,
            country
        }))

        nagivate('/payment')
      
    }

    useEffect(()=>{
        if(!userInfo){
            nagivate('/signin?rediract=/shipping')
        }
    })

  return (
    <>
    <Helmet>
        <title>Shipping Address</title>
    </Helmet>

    <CheckOut step='2'/>

   <Container className='w-25  border p-3'>
       <Alert>
           <h5>Shipping Address</h5>
       </Alert>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control value={name} type="text" placeholder="Enter Your Name..." onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-1">
            <Form.Label>Adress</Form.Label>
            <Form.Control value={address} type="text" placeholder="Enter Address..." onChange={(e)=>setAddress(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-1">
            <Form.Label>City</Form.Label>
            <Form.Control value={city} type="text" placeholder="City..." onChange={(e)=>setCity(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-1">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control value={post} type="text" placeholder="Post Code..." onChange={(e)=>setPost(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Country</Form.Label>
            <Form.Control value={country} type="text" placeholder="Country" onChange={(e)=>setCountry(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Containue
        </Button>
    </Form>
   </Container>
    </>
  )
}

export default Shipping