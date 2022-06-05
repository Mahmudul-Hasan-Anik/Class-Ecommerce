import React from 'react';
import { Store } from '../userContext';
import { Container,Row,Col,Alert,Button } from 'react-bootstrap';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const WishList = () => {
    const navigate = useNavigate()

    const {state2,dispatch2,dispatch} = useContext(Store)
    const {wishList:{wishListItems}} = state2
  
    const removeItems = (item,quantity)=>{
      dispatch2({
        type:'REMOVE_WISHLIST_ITEM',
        payload:item
      })

      dispatch({
        type:'ADD_CART_ITEM',
        payload:{...item, quantity}
      })
    }
  
    return (
          <>
          <Helmet>
            <title>Wish List Page</title>
          </Helmet>
  
            <h1 style={{textAlign:'center'}}>Wish List</h1>
          <Container>
            <Row className='mt-5'>
              <Col  >
                 
                 {wishListItems.length === 0 ?  
                    <Alert variant="danger">
                    Wish List is Empty
                    </Alert>
                 :  
  
                  <>
                  {wishListItems.map((item)=>(
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
                          <Box sx={{ display: 'flex',  marginTop: 3}}>
                            <CardContent >
                              <Typography component="div" variant="button">
                                  <Button variant="primary" onClick={()=>removeItems(item, item.quantity)}>
                                    Add to <ShoppingCartIcon/>
                                  </Button>
                              </Typography>
                            </CardContent>            
                          </Box>
                        </Card>
                  ))} 
                  </>
                 }  
              </Col>
            </Row>
          </Container>      
          </>
    )
}

export default WishList