import React from 'react';
import { Offcanvas,Button,ButtonGroup} from 'react-bootstrap';

import { Store } from '../userContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const Cart = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

const {state,dispatch} = useContext(Store)
const {cart:{cartItems}} = state

  return (
      <>
     <Button variant="warning" className='sidebar' onClick={handleShow}>
       <div>
         <span><i class="fas fa-shopping-bag"></i></span> <br />
         <span>
           {cartItems.reduce((acc,curr)=> acc + curr.quantity, 0)} Items
         </span>
       </div>

       <div style={{borderTop:'1px solid black'}}>
          <span>
            {cartItems.reduce((acc,curr)=> acc + curr.quantity * curr.price, 0)} $
          </span>
       </div>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' style={{width:'370px',display:'flex', overflowY:'scroll'}} handleShow={props.handleShow} >
          <Offcanvas.Header closeButton>
              <Offcanvas.Title><i class="fas fa-shopping-bag"></i> Items</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              {cartItems.map((item)=>(
                 <Card sx={{ display: 'flex', margin: '10px 0px' }}>
                 <CardMedia
                         component="img"
                         sx={{ width: 80}}
                         image={item.image}
                         alt="Live from space album cover"
                       />
     
                       <Box sx={{ display: 'flex', flexDirection: 'column',width:'50px'}}>
                         <CardContent>
                           <Typography component="div" variant="p">
                             {item.name}
                           </Typography>
                           <Typography variant="subtitle1" color="text.secondary" component="p">
                            {item.price}$
                           </Typography>
                         </CardContent>
                       </Box>
     
                       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                         <CardContent >
                           
                           <Typography component="div" variant="span" color="text.secondary">
                           </Typography>
                           <Typography component="div" variant="p">
                             <ButtonGroup  className="mt-2">
                                    <Button variant='secondary' onClick={()=>updateButton(item, item.quantity - 1)} disabled={item.quantity == 1}>-</Button>
                                    <Button variant='light'>{item.quantity}</Button>
                                    <Button variant='secondary' onClick={()=>updateButton(item, item.quantity + 1)} disabled={item.quantity == item.stock}>+</Button>
                              </ButtonGroup>
                           </Typography>
                         </CardContent>
                       
                       </Box>
                       <Box sx={{ display: 'flex',  marginTop: 1}}>
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

            <Card style={PlaceToOrderStyle}>
              
            <CardContent >
              <ButtonGroup className='w-100'>
            
                  <Link to='/navCart' style={{color:'white'}}>
                    <Button variant="secondary" >
                      place to order
                    </Button>
                  </Link>
              
                  <Button variant="primary">
                    Price: {cartItems.reduce((acc,curr)=> acc + curr.price * curr.quantity, 0)}$
                  </Button>
              </ButtonGroup>
            </CardContent>
            </Card>      
          </Offcanvas.Body>

        </Offcanvas>
      </>
  );
};

const PlaceToOrderStyle = {
  position:'fixed', 
  bottom:'0%',
  right:'0',
  width:'340px',
  marginRight:"20px",
  marginTop:'20px'
}

export default Cart;