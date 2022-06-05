import React, { useContext, useEffect, useReducer } from 'react'
import { Alert, Container,Card,ListGroup,Row,Col, Button } from 'react-bootstrap'
import { Store } from '../userContext'
import {Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PayPalButtons,usePayPalScriptReducer } from "@paypal/react-paypal-js";
import StripeCheckout from 'react-stripe-checkout';

function reducer(state,action){
    switch(action.type){
        case 'FATCH_REQUEST':
            return {
                ...state, loading: true, error: ''
            }
        case 'FATCH_SUCCESS':
            return {
                ...state, loading: false, error:'', order: action.payload
            }
        case 'FATCH_FAIL':
            return{
                ...state, loading: false, error: action.payload
            }
        case 'PAY_REQUEST':
            return{
              ...state, loadingPay: true
            }
        case 'PAY_SUCCESS':
            return{
              ...state, loadingPay: false, successPay: true
            }
        case 'PAY_FAIL':
            return{
              ...state,loadingPay:false, errorPay: action.payload
            }
        case 'PAY_RESET':
            return{
              ...state, loadingPay: false, successPay: false
            }
        default: 
            return state
    }
}

const OrderPage = () => {
    const [{loading,error,order,successPay,loadingPay},dispatch] = useReducer(reducer,{
        loading: false,
        error: '',
        order: {},
        successPay: false,
        loadingPay: false
    })

//Paypal Start----
const [{isPending}, paypalDispatch] = usePayPalScriptReducer()

function createOrder(data,actions){
  return actions.order
  .create({
    purchase_units:[
      {
        amount: {
          value: order.totalPrice
        }
      }
    ]
  }).then((orderID)=>{
    return orderID
  })
}


function onApprove(data,actions){
  return actions.order.capture().then( async(details)=>{
      try{
          dispatch({type: 'PAY_REQUEST'})
          const {data} = await axios.put(`/api/orders/${order._id}/pay`, details,{
            headers: {authoraization: `Bearer ${userInfo.token}`}
          })
          dispatch({type: 'PAY_SUCCESS',payload: data})
          toast.success('Payment Successful')
          console.log('hello success')
      }catch(e){
          dispatch({type: 'PAY_FAIL', payload: e.massage})
          toast.error(e.massage)
      }
  })
}

function onError(e){
  toast.error(e.massage)
}
//Paypal End----

const {state3} = useContext(Store)
const {userInfo} = state3

const params = useParams()
const {id: orderID} = params
const navigate = useNavigate()

useEffect(()=>{
    if(!order._id || successPay || (order._id && order._id !== orderID)){
 
        const fetchOrder = async ()=>{
            try{
                dispatch({
                    type: 'FATCH_REQUEST'
                })
                const {data} = await axios.get(`/api/orders/${orderID}`, {
                    headers: {authoraization: `Bearer ${userInfo.token}`}
                })

                dispatch({
                    type:'FATCH_SUCCESS',
                    payload: data
                })
 
            }catch(error){
                dispatch({
                    type:'FATCH_FAIL',
                    payload: error
                })
            }
          }
          fetchOrder()
          if(successPay){
            dispatch({type: 'PAY_RESET'})
          }

    }else{
      const loadPaypalScript = async ()=>{
        const {data: clientId} = await axios.get('/api/keys/paypal', {
          headers: {authoraization: `Bearer ${userInfo.token}`}
        })
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
             currency: 'USD'
          }
        })
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending'
        })
      }
      loadPaypalScript()
    }
},[order,orderID,userInfo,navigate,paypalDispatch,successPay])

//-------STRIPE START HERE---------
  const handleToken = async()=>{
        try{
          dispatch({
              type: 'FATCH_REQUEST'
          })
          const {data} = await axios.get(`/api/orders/${orderID}`, {
              headers: {authoraization: `Bearer ${userInfo.token}`}
          })

          dispatch({
              type:'FATCH_SUCCESS',
              payload: data
          })

      }catch(error){
          dispatch({
              type:'FATCH_FAIL',
              payload: error
          })
      }
  }

  const handleVartualCard = ()=>{
    axios.post(`/api/card/${userInfo._id}`,{
      price: order.totalPrice
    })
  }

  return (
    <>
    {
    loading?
    <h1>Loading</h1>
    :
    error?
        <Alert>
            <p>{error}</p>
        </Alert>
    :
     <Container className='mt-3'>
       <Row>
         <Col lg={8}>
            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                  <b>Name :</b> {order.shippingAddress && order.shippingAddress.name} <br/>
                  <b>Adreess :</b> 
                      {order.shippingAddress && order.shippingAddress.address} , 
                      {order.shippingAddress && order.shippingAddress.city} ,
                      {order.shippingAddress && order.shippingAddress.country}
                  <br/>

                  <b>Post :</b> {order.shippingAddress && order.shippingAddress.post}
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <b>Payment Method :</b> {order.paymenOption} <br/>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{width: '100%' }}>
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <Card.Text>
                    <ListGroup>
                    {order.orderItems && order.orderItems.map((item)=>(
                      <ListGroup.Item>
                        <Row>
                          <Col lg={6}>
                            <img src={item.image} alt="image" style={{width:'60%'}}/>
                          </Col>
                          <Col lg={3}>
                            <Link to={`/product/${item.slug}`}>{item.name}</Link><br/>
                            Quantity:{item.quantity}
                          </Col>
                          <Col lg={3}>
                           Price: {item.price}$
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                    </ListGroup>
                </Card.Text>
              </Card.Body>
            </Card>

         </Col>

         <Col lg={4}>
           <h4>Order Summary</h4>
           <Row>
             <Col>Total Price:</Col>
             <Col>{order.totalPrice}$</Col>
           </Row>

           <Row>
             <Col>Shipping</Col>
             <Col>{order.shippingPrice}$</Col>
           </Row>

           <Row>
             <Col>Tax</Col>
             <Col>{order.tax}$</Col>
           </Row>

           <Row className='mt-5'>
             {!order.isPaid 
             &&
             isPending ?
                  <h1>Loading...</h1>
                :  
                  <Col>
                    {order.paymenOption == 'Paypal' 
                     && 
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                    }

                    {order.paymenOption == 'Strip' 
                     && 
                     <StripeCheckout
                        token={handleToken}
                        stripeKey="pk_test_51KqLycDveGIuEaLs4XQQy1fim83dvUeIdZi0OUx1GdDIQpoL1y1V84Pg2kbjyriS4AzOo0Ebl0c0gwJNW4lxlkxT00F0Ifgo8I"
                        panelLabel='Payment'
                        currency='USD'
                        amount={order.totalPrice * 100} 
                     />
                     
                    }

                    {order.paymenOption == 'vartualCard' &&
                      <Button style={{width:'300px', height:'100px',fontSize:'20px'}} onClick={handleVartualCard}>Vartual Card</Button>
                    }
                        
                  </Col>
              }

              {loadingPay && <h1>Payment Loading...</h1>}
           </Row>
           
         </Col>
       </Row>
     </Container>
    }
    </>
  )
}

export default OrderPage


