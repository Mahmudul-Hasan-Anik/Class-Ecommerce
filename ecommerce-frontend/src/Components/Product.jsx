import React, { useState } from 'react';
import {Card,Button,Row,Col,Spinner,Form,Navbar,Container,Nav,FormControl} from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useEffect,useReducer,useContext } from 'react';
import BasicRating from './Rating';
import { Helmet } from 'react-helmet-async';
import { Store }  from '../userContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

//REDUCER FUNCTION
function reducer(state, action) {
  switch (action.type) {
    case 'FATCH_REQUEST':
      return {...state, loading: true};
    case 'FATCH_SUCCESS':
      return {...state, loading: false, product: action.payload};
    case 'FATCH_FAILS':
      return {...state, loading: false, error: action.payload};
    default:
     return state;
  }
}


const Product = () => {
  const [{loading,error,product}, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    product: []
  });


  useEffect( async() => {
    dispatch({type: 'FATCH_REQUEST'})

    try{
      const product =  await axios.get(`/product`)
      dispatch({type: 'FATCH_SUCCESS', payload: product.data})
    }catch(e){
      dispatch({type: 'FATCH_FAILS', payload:e.message})
    }
  }, [])


  const {state,dispatch: contextDispatch, state2,dispatch2} = useContext(Store)

    const {cart} = state
    const {wishList} = state2
    
    const handleCart = async(product)=>{
    

      const existingItems = cart.cartItems.find((item)=> item._id === product._id)
      const quantity = existingItems ? existingItems.quantity + 1 : 1

      const {data} = await axios.get(`/product/${product._id}`)
      
      if(data.stock < quantity){
        window.alert(`${product.name} is out of Stock`)
        return
      }
     
      contextDispatch({
        type:'ADD_CART_ITEM',
        payload:{...product, quantity}
      })
    }

    /// ============ FOR WISH LIST ========== ///
    const handleWishList = async(product)=>{
      const existingItems = wishList.wishListItems.find((item)=> item._id === product._id)
      const quantity = existingItems ? existingItems.quantity + 1 : 1

      const {data} = await axios.get(`/product/${product._id}`)
      
      if(data.stock < quantity){
        window.alert(`${product.name} is out of Stock`)
        return
      }

      dispatch2({
        type:'WISHLIST_CART_ITEM',
        payload:{...product, quantity}
      })
    }

    //FOR SEARCH 
    const [searchProduct, setSearchProduct] = useState([])
    const handleSearch = (e)=>{
      product.map((item)=>{
        setSearchProduct(item.name.toLowerCase().includes(e.target.value))
      })
    }

  return (
    <>
     <Helmet>
        <title>Any Mart-Product Page</title>
     </Helmet>
     {/* SEARCH INPUT NAV START*/}
     <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}></Nav>
            <Form className="d-flex">
              <FormControl type="search" placeholder="Search" className="me-2" style={{ width: '300px' }} onChange={handleSearch}/>
            </Form>
        </Container>
      </Navbar>
     {/* SEARCH INPUT NAV END*/}



        <Row  lg="4">
        
        {loading?
          <div className='spinner'>
            <Spinner animation="border"/>
          </div>
        :
        product.map((item)=>( 
             <Col className='mb-4' key={item._id}>
                <Card >
                  <Link to={`/product/${item.slug}`}>
                    <Card.Img variant="top" src={item.img} />
                  </Link> 
                    <Card.Body>
                        <Card.Title>
                  <Link to={`/product/${item.slug}`}>
                          {item.name}
                  </Link>
                        </Card.Title>
                        <Card.Text>
                          <BasicRating rating={item.rating} nameOfRating={item.nameOfRating}/>
                        </Card.Text>
                        <Card.Text>
                        {item.desciption}
                        </Card.Text>
                        <Card.Text>
                        {item.price}$
                        </Card.Text>
                       
                        <Button variant="primary" onClick={()=>handleCart(item)} style={{color:'white',marginRight:'10px'}}>
                          Add to <ShoppingCartIcon/>
                        </Button>
                        <Button variant="secondary" onClick={()=>handleWishList(item)} style={{color:'white'}}>
                          Add to <FavoriteBorderOutlinedIcon/>
                        </Button>
                    </Card.Body>
                </Card>
                 
             </Col>
        ))}
       
      </Row> 
    </>
  );
};

export default Product;
