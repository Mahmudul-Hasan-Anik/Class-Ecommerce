import React from 'react';
import { useParams } from "react-router-dom"
import { useEffect,useReducer,useState,useContext } from 'react';
import axios from 'axios'
import BasicRating from './Rating';
import { Container,Row,Col, Button,Alert, Form,InputGroup,FormControl } from 'react-bootstrap';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import { Badge } from 'react-bootstrap';
import { Store }  from '../userContext';
import { Link } from 'react-router-dom';
import Cart from './Cart'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { FaArrowLeft,FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";


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

const ProductDetails = () => {
  const params = useParams();
  const [relatedProduct, setRelatedProduct] = useState([])
  const [cuponText, setCuponText] = useState('')
  const [cupon, setCupon] = useState('')
  const [cuponError, setCuponError] = useState('')

  const [{loading,error,product}, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    product: {}
  });

  useEffect( async() => {
    dispatch({type: 'FATCH_REQUEST'})

    try{
      const product =  await axios.get(`${params.slug}`)
      dispatch({type: 'FATCH_SUCCESS', payload: product.data})

      const relatedProduct =  await axios.get(`/product`)
      const filterItem = relatedProduct.data.filter((item)=>(
        item.catagory == product.data.catagory && item.name !== product.data.name
      ))
      setRelatedProduct(filterItem)
            
    }catch(e){
      dispatch({type: 'FATCH_FAILS', payload:e.message})
    }
  }, [params.slug])


    const {state,dispatch: contextDispatch} = useContext(Store)
    const {cart} = state

    const handleCart = async()=>{

      const existingItems = cart.cartItems.find((item)=> item._id === product._id)
      const quantity = existingItems ? existingItems.quantity + 1 : 1

      const {data} = await axios.get(`/product/${product._id}`)
      
      if(data.stock < quantity){
        window.alert(`${product.name} is out of Stock`)
        return
      }
     
      contextDispatch({
        type:'ADD_CART_ITEM',
        payload:{...product, quantity, price:cupon?cupon:product.price}
      })
    }

//=============FOR CUPON=========================// 
    const handleCuponText = (e)=>{
      setCuponText(e.target.value)
    }

    const handleCupon = ()=>{
      if(product.cupon !== ''){
        if(product.cupon == cuponText){
          const discountAmount = (product.discount*product.price)/100
          setCupon(product.price - discountAmount)
          setCuponText('')
        }else{
          setCuponError('Referral/discount code not matched')
        }
      }else{
        setCuponError('There is No discount for this Product')
      }
    }

//============ FOR REACT SLICK SLIDER ============//
const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 1500,
  prevArrow:<FaArrowLeft/>,
  nextArrow:<FaArrowRight/>
};

  return (
    <>
      <Container className='mt-5'>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
        <Row>
          {product?
          <>
          <Col sm={5} >
            <InnerImageZoom src={product.img} zoomSrc={product.img}/>
          </Col>
          <Col sm={7}>
          <>
            <h1 style={{fontSize:'30px'}}>{product.name}</h1>
            
            {product.stock <= 0?
              <Badge bg="danger" style={{marginBottom:'10px'}}>
               Out Of Stock
              </Badge>
            :
              <Badge bg="success" style={{marginBottom:'10px'}}>
                Stock: {product.stock} pcs
              </Badge>
            }
            </>
            
            <BasicRating rating={product.rating} nameOfRating={product.nameOfRating}/>
            <p>Brand: {product.Brand}</p>
            <p>{product.desciption}</p>

            price: {cupon? <p><del>{product.price}$</del></p>:<p>{product.price}$</p>}
            {cupon?<p>{cupon}</p>:cuponError}
            
            <InputGroup className="mb-3 " style={{width:'230px'}}>
              <FormControl placeholder="Referral/Discount Code" style={{fontSize:'13px'}} onChange={handleCuponText} value={cuponText}/>
              <Button variant="primary" onClick={handleCupon}>
                Apply
              </Button>
            </InputGroup>
      
                <Col style={{marginTop:'20px'}}>
                  <Button style={{width:'232px',color:'white'}} variant='secondary' onClick={handleCart}>Add to Cart</Button>
                </Col>
          </Col>
        </>
          :
          <Alert variant='danger' className='text-center'>
            Product Not Found.. Please Try Again
          </Alert>
          }
        </Row>
        <hr className='mt-4'/>
        <h4>Related Product</h4>
        
        <Row className='mt-4'>
          {relatedProduct.length > 0 ? 
          <Slider {...settings}>
          {relatedProduct.map((item)=>(
            <Col>
            <Link to={`/product/${item.slug}`}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="160" image={item.img}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desciption}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button className='w-100' variant='secondary'>Check Details</Button>              
                </CardActions> */}
              </Card>
              </Link>
            </Col>
          ))}
            </Slider>
          :
           <Alert variant='danger'>
             No Related Product Available
           </Alert>
          }
        </Row>
      </Container>

      <Cart product={product}/>
      </>
  );
};

export default ProductDetails;
