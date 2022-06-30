import React from 'react';
import { useParams } from "react-router-dom"
import { useEffect,useReducer,useState,useContext } from 'react';
import axios from 'axios'
import BasicRating from './Rating';
import { Container,Row,Col, Button,Alert,InputGroup,FormControl,Form } from 'react-bootstrap';
import InnerImageZoom from 'react-inner-image-zoom';
import { Helmet } from 'react-helmet-async';
import { Badge } from 'react-bootstrap';
import { Store }  from '../userContext';
import { Link } from 'react-router-dom';
import Cart from './Cart'
import { Card, CardContent, CardMedia, Typography,Rating,Box } from '@mui/material';
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
  const {state3} = useContext(Store)
  const params = useParams();
  const [relatedProduct, setRelatedProduct] = useState([])
  const [cuponText, setCuponText] = useState('')
  const [cupon, setCupon] = useState('')
  const [cuponError, setCuponError] = useState('')
  const [start, setStart] = useState('');
  const [review, setReview] = useState('');
  const {userInfo} = state3

  const [{loading,error,product}, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    product: {}
  });

  

  useEffect( async() => {
    let name;
    if(userInfo){
      if(userInfo.isAffilate){
        name = userInfo._id
      }
    }

    dispatch({type: 'FATCH_REQUEST'})

    try{
      const product =  await axios.get(`${params.slug}?id=${name}`)
   
      dispatch({type: 'FATCH_SUCCESS', payload: product.data})

      const relatedProduct =  await axios.get(`/product`)
      // console.log(relatedProduct)
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

    const handleRatingChange = async(e)=>{
        e.preventDefault()

        await axios.post(`/product/rating/${product._id}`, {
          owner: userInfo._id,
          ratings: start,
          productId: product._id,
          reviews: review
        })
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


console.log(product)
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
            <InnerImageZoom src={product.image} zoomSrc={product.image}/>
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
                <CardMedia component="img" height="160" image={item.image}/>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desciption}
                  </Typography>
                </CardContent>

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

            {/* USER REVIEW AND RATING  */}
        <Form className='mt-3' onSubmit={handleRatingChange}>
          <h3>Ratings and Reviews</h3><hr/>
            <h5>Rate Your Experience</h5>
            <Box sx={{'& > legend': { mt: 2 },}}>
                <Rating
                name="rating"
                value={start}
                onChange={(e)=>setStart(e.target.value)}
                />
            </Box>

            <Form.Group className="mb-3" >
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder='Please write your honest opinion and give rating'
                  onChange={(e)=>setReview(e.target.value)}
                />
            </Form.Group>
            <Button variant='dark' onClick={handleRatingChange}>Submit</Button>
        </Form>
      </Container>

      <Cart product={product}/>
      
      </>
  );
};

export default ProductDetails;
