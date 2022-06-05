import React, { useContext, useState } from 'react'
import { Container,Form,Alert, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../userContext'
import CheckOut from './CheckOut'

const Payment = () => {
    const {state5,dispatch5} = useContext(Store)
    const navigate = useNavigate()
    const [payment, setPayment] = useState(state5.paymentMethod? state5.paymentMethod: '')
    

    const handleSubmit = (e)=>{
      e.preventDefault()
      
      dispatch5({
          type: 'PAYMENT_METHOD',
          payload: payment
      })
      localStorage.setItem('paymentMethod', JSON.stringify(payment))
      navigate('/placeholder')
    }

  return (
      <>
      <Helmet>
          <title>Payment</title>
      </Helmet>
      
      <CheckOut step='3'/>
    <Container className='w-25 border mt-5 p-3'>
        <Form onSubmit={handleSubmit}>
        <Alert variant='info' style={{textAlign:'center'}}>
            <h5>Choose Payment Option</h5>
        </Alert>
        <Form.Check 
            type="radio"
            label='Paypal'
            id='paypal'
            value='Paypal'
            checked={payment == 'Paypal'}
            onChange={(e)=>setPayment(e.target.value)}
        />
        <Form.Check 
            type="radio"
            label='Strip'
            id='strip'
            value='Strip'
            checked={payment == 'Strip'}
            onChange={(e)=>setPayment(e.target.value)}
        />
        <Form.Check 
            type="radio"
            label='Sslcommerz'
            id='sslcommerz'
            value='Sslcommerz'
            checked={payment == 'Sslcommerz'}
            onChange={(e)=>setPayment(e.target.value)}
        />
        <Form.Check 
            type="radio"
            label='vartual Card'
            id='vartualCard'
            value='vartualCard'
            checked={payment == 'vartualCard'}
            onChange={(e)=>setPayment(e.target.value)}
        />

        <Link to='/shipping'>
            <Button className='m-3' type='submit'>Previous</Button>
        </Link>
        <Link to='/placeholder'>
            <Button className='m-3' type='submit' onClick={handleSubmit}>Containue</Button>
        </Link>
        </Form>
    </Container>
    </>
  )
}

export default Payment