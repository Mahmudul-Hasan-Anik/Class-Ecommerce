import React, { useContext,useEffect,useReducer,useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container,Row,Col,Card,Button,Modal, Form,ListGroup } from 'react-bootstrap'
import CheckOut from './CheckOut'
import { Store } from '../userContext'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'


const reducer = (state,action)=>{
  switch(action.type){
    case 'CREATE_REQUEST':
          return {...state, loading: true}
    case 'CREATE_SUCCESS':
          return {...state, loading: false}
    case 'CREATE_FAIL':
          return {...state, loading: false}
  }
}

const Placeholder = () => {

  const navigate = useNavigate()

  const {state,dispatch:contextDispatch,state3,state4,dispatch4,state5,dispatch5} = useContext(Store)

  const [{loading},dispatch] = useReducer(reducer,{
    loading: false
  })

  //For Edit
  const [show, setShow] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClosePayment = () => setShowPayment(false);
  const handleShowPayment = () => setShowPayment(true);



  const [name, setName] = useState(state4.shipping.name || '')
  const [address, setAddress] = useState(state4.shipping.address || '')
  const [city, setCity] = useState(state4.shipping.city || '')
  const [post, setPost] = useState(state4.shipping.post || '')

  const [country, setCountry] = useState(state4.shipping.country || '')
  const [payment, setPayment] = useState(state5.paymentMethod? state5.paymentMethod: '')
  
  const [total, setTotal] = useState('')

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

        setShow(false)
  }

  const handleSubmitPayment = (e)=>{
    e.preventDefault()
      
    dispatch5({
        type: 'PAYMENT_METHOD',
        payload: payment
    })
    localStorage.setItem('paymentMethod', JSON.stringify(payment))
    setShowPayment(false)
  }

  const {shipping} = state4
  const {paymentMethod} = state5
  const {userInfo} = state3

  //Payment Summary
  useEffect(()=>{
    const totalAmount = state.cart.cartItems.reduce((acc,curr)=> acc + curr.price * curr.quantity, 0)
    setTotal(totalAmount)
  },[state.cart.cartItems])

  const delivaryCharge = total < 1000 ? 0 : 20
  const taxAmount = total +  total < 500 ? 0 : (total*5)/100

  // Final Place Order
  const handlePlaceOrder = async()=>{
    try{

      const {data} = await axios.post('/api/orders',{
        orderItems: state.cart.cartItems,
        shippingAddress: shipping,
        paymenOption: paymentMethod,
        productPrice: total,
        shippingPrice: 0,
        tax: taxAmount,
        totalPrice: total + taxAmount + delivaryCharge,
        user: userInfo
      },
      {
          headers:{
            authoraization: `Bearer ${userInfo.token}` 
          }
      }
      )

      contextDispatch({type:'CLEAR_CART'})
      dispatch({type:'CREATE_SUCCESS'})
      localStorage.removeItem('cart')
      navigate(`/orders/${data.order._id}`)

      console.log(data)
    }catch(err){
      dispatch({type:'CREATE_FAIL'})
      toast.error(err)
    }
  }
  
  return (
    <>
      <Helmet>
          <title>Place Order</title>
      </Helmet>
      
      <CheckOut step='4'/>
    <Container className='mt-5 p-3'> 
    <Row>
        <Col lg={8}>
          <h3>Preview Order</h3>
        <Card>
          <Card.Body>
            <Card.Header className='mb-2'>Shipping Address</Card.Header>
            <Card.Text>
             <b>Name : </b> {shipping.name} <br/>
             <b>Address : </b> {shipping.address}, {shipping.city}, {shipping.country} <br/>
             <b>Post Code : </b> {shipping.post} 
            </Card.Text>
            <Button variant="primary" onClick={handleShow}>Edit</Button>
          </Card.Body>
        </Card>


        <Card className=' mt-3' >  
          <Card.Body>
            <Card.Header className='mb-2'>Payment Method</Card.Header>
            <Card.Text>
             <b>Name : </b> {paymentMethod} <br/> 
            </Card.Text>
            <Button variant="primary" onClick={handleShowPayment}>Edit</Button>
          </Card.Body>
        </Card>


        <Card className=' mt-3' >   
          <Card.Body>
            <Card.Header className='mb-2'>Order Information</Card.Header>

            <b>Total Items: </b>{state.cart.cartItems.length}
            <Card.Text className='mt-4'>

             {state.cart.cartItems.map((item)=>(
                <Row className='mb-3'>
                  <Col><img src={item.image} style={{width:'150px',height:'100px'}}/></Col>
                  <Col>
                  <p><b>Name : </b>{item.name}</p>
                  <p><b>Price : </b>{item.price}$</p>
                  </Col>
                  <Col>
                   <p><b>Quantity : </b>{item.quantity}</p>
                   <p><b>Total Price : </b>{item.price * item.quantity}$</p>
                  </Col>
                </Row>
               ))}
            </Card.Text>
            <Link to='/navCart'><Button variant="primary">Edit</Button></Link>
          </Card.Body>
        </Card>

        </Col>

      <Col lg={4} className='mt-4 pt-3'>
      <Card>  
          <Card.Body>
            <Card.Header>Payment Summary</Card.Header>
            <Card.Text className='mt-3'>
                <ListGroup>
                  <ListGroup.Item>
                    <b>Price : {total}$</b>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <b>Delivary Charge : {delivaryCharge}$</b>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <b>Tax : {taxAmount}$</b>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <b>Total Price : {total + taxAmount + delivaryCharge}$</b>
                  </ListGroup.Item>
                </ListGroup>
            </Card.Text>
            <Button variant="primary" onClick={handlePlaceOrder}>Place Order</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>


  
  {/* MODAL FOR EDIT YOUR INFORMATION */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>

{/* FOR PAYMENT METHOD */}
      <Modal
        show={showPayment}
        onHide={handleClosePayment}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form onSubmit={handleSubmitPayment}>

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
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePayment}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitPayment}>Submit</Button>
        </Modal.Footer>
      </Modal>
        
    </Container>
    </>
  )
}

export default Placeholder