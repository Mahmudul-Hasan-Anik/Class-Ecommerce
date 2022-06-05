import React from 'react';
import { Store } from '../userContext';
import { Container,Row,Col,Alert,Button,ButtonGroup,InputGroup,FormControl  } from 'react-bootstrap';
import { useContext,useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom';

 

const NavCart = () => {
  const navigate = useNavigate()
  const [cuponText, setCuponText] = useState('')
  const [discountAmount, setDiscountAmount] = useState('')
  const [cuponError, setCuponError] = useState('')

  const {state,dispatch} = useContext(Store)
  const {cart:{cartItems}} = state

  const updateButton = (item,quantity)=>{
     dispatch({
       type: 'ADD_CART_ITEM',
       payload: {...item, quantity}
     })
  }

  const removeItems = (item)=>{
    dispatch({
      type:'REMOVE_CART_ITEM',
      payload: item
    })
  }

  const handleCheckOut = ()=>{
    navigate('/signin?rediract=/shipping')
  }

 //=============FOR CUPON=========================// 
    const handleCuponText = (e)=>{
      setCuponText(e.target.value)
    }

    const cuponForAll = 'eid mubarak'

    const handleCupon = ()=>{
      if(cuponText == cuponForAll){
        const amount = ( cartItems.reduce((acc,curr)=> acc + curr.price * curr.quantity,0)*20)/100
        setDiscountAmount(amount)
        setCuponText('')
      }else{
        setCuponError('No Cupon Available')
      }
    }
 //======================================//

  return (
        <>
        <Helmet>
          <title>Cart Page</title>
        </Helmet>

        <Container>
          <h1 style={{textAlign:'center'}}>Shopping Cart</h1>
          <Row className='mt-5'>
            <Col lg={8} >
               
               {cartItems.length === 0 ?  
                  <Alert variant="danger">
                  Card Not Found
                  </Alert>
               :  

                <>
                {cartItems.map((item)=>(
                  <Card sx={{ display: 'flex', margin:2}}>
                        <CardMedia
                          component="img"
                          sx={{ width: 152}}
                          image={item.image}
                          alt="Live from space album cover"
                        />
      
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px'}}>
                          <CardContent>
                            <Typography component="div" variant="h5">
                              <Link to={`/product/${item.slug}`}>{item.name}</Link>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="h5">
                             {item.price}$
                            </Typography>
                          </CardContent>
                        </Box>
      
                        <Box sx={{ display: 'flex', flexDirection: 'column', width:'200px' }}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            
                            <Typography component="div" variant="span" color="text.secondary">
                                Total:<span style={{color:'red'}}>{item.price}$</span>
                            </Typography>
                            <Typography component="div" variant="div">
                            
                                   <ButtonGroup  className="mt-2">
                                    <Button variant='secondary' onClick={()=>updateButton(item, item.quantity - 1)} disabled={item.quantity == 1}>-</Button>
                                    <Button variant='light'>{item.quantity}</Button>
                                    <Button variant='secondary' onClick={()=>updateButton(item, item.quantity + 1)} disabled={item.quantity == item.stock}>+</Button>
                                  </ButtonGroup>
                                   
                            </Typography>
                          </CardContent>
                        </Box>

                        <Box sx={{ display: 'flex',  marginTop: 3}}>
                          <CardContent >
                            <Typography component="div" variant="button">
                              <IconButton aria-label="delete">
                                <DeleteIcon fontSize="medium" onClick={()=>removeItems(item)}/>
                              </IconButton>
                            </Typography>
                          </CardContent>            
                        </Box>
                      </Card>
                ))} 
                </>
               }  
            </Col>

            <Col lg={4} >
              <h1>{cartItems.reduce((acc,curr)=> acc + curr.quantity, 0)} items</h1>
              <div>
              <InputGroup className="mb-2" >
                <FormControl placeholder="Referral/Discount Code" style={{fontSize:'13px'}} onChange={handleCuponText}/>
                <Button variant="primary" onClick={handleCupon}>
                  Apply
                </Button>
              </InputGroup> 
              </div>

              {discountAmount?cartItems.reduce((acc,curr)=> acc + curr.price * curr.quantity, 0)-discountAmount:cartItems.reduce((acc,curr)=> acc + curr.price * curr.quantity, 0)}

              <Button variant='primary' className='w-100' onClick={handleCheckOut}>Check Out</Button>
            </Col>
          </Row>
        </Container>
        
        </>
  )
}

export default NavCart
