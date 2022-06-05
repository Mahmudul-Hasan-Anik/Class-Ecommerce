import React, { useContext, useEffect,useReducer, useState } from 'react'
import BasicRating from './Rating';
import axios from 'axios'
import { Container,Row,Col,Dropdown ,Card, Button, Alert} from 'react-bootstrap'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Store } from '../userContext';

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

const Compare = () => {
    const [comProduct, setComProduct] = useState('');
    const [comProduct2, setComProduct2] = useState('');
    const {state2, dispatch2} = useContext(Store)

    const [{error,product}, dispatch] = useReducer(reducer, {
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

      const handleWishList = (comProduct)=>{
        dispatch2({
          type:'WISHLIST_CART_ITEM',
          payload:comProduct
        })
      }

      const handleCompare = async(params)=>{
        const product = await axios.get(`/product/${params.slug}`)
        setComProduct(product.data)
        console.log(product.data)
      }

      const handleCompare2 = async(params)=>{
        const product = await axios.get(`/product/${params.slug}`)
        setComProduct2(product.data)
      }
  return (
    <>
    <Container  className='mt-3'>
        <Row>
            <Col>
            <Dropdown>
                <Dropdown.Toggle variant="warning">
                   Select Your Product
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {product.map((item)=>(
                    <Dropdown.Item onClick={()=>handleCompare(item)}>
                      <Row>
                        <Col>
                          <img src={item.image} style={{width:"70px"}}/>
                        </Col>
                        <Col>
                        <p>{item.name}</p>
                        </Col>
                      </Row>
                    </Dropdown.Item>
                 ))}
                </Dropdown.Menu>
            </Dropdown>
                  {comProduct? 
                  <Card style={{ width: '28rem' }} className='mt-3'>
                  <Card.Img  src={comProduct.image} />
                  <Card.Body>
                      <Card.Title>{comProduct.name}</Card.Title>
                      <Card.Title>
                        <BasicRating rating={comProduct.rating} nameOfRating={comProduct.nameOfRating}/>
                      </Card.Title>
                      <Card.Text>{comProduct.desciption}</Card.Text>
                      <Card.Text>Price: {comProduct.price}</Card.Text>
                      <Button className='w-100' variant="secondary" onClick={()=>handleWishList(comProduct)}>Add to <FavoriteBorderOutlinedIcon/></Button>
                  </Card.Body>
                  </Card>
                  : 
                  <Alert variant='info' className='mt-2'>
                    <h5>Select a Product</h5>
                  </Alert>
                  }
            </Col>
            <Col>
            <Dropdown>
                <Dropdown.Toggle variant="warning">
                    Select Your Product
                </Dropdown.Toggle>

                <Dropdown.Menu>
                {product.map((item)=>(
                    <Dropdown.Item onClick={()=>handleCompare2(item)}>
                      <Row>
                        <Col>
                          <img src={item.image} style={{width:"70px"}}/>
                        </Col>
                        <Col>
                        <p>{item.name}</p>
                        </Col>
                      </Row>
                    </Dropdown.Item>
                 ))}
                </Dropdown.Menu>
            </Dropdown>
                  {comProduct2? 
                  <Card style={{ width: '28rem' }} className='mt-3'>
                  <Card.Img  src={comProduct2.image} />
                  <Card.Body>
                      <Card.Title>{comProduct2.name}</Card.Title>
                      <Card.Title>
                        <BasicRating rating={comProduct2.rating} nameOfRating={comProduct2.nameOfRating}/>
                      </Card.Title>
                      <Card.Text>{comProduct2.desciption}</Card.Text>
                      <Card.Text>Price: {comProduct2.price}</Card.Text>
                      <Button className='w-100' variant="secondary" onClick={()=>handleWishList(comProduct2)}>Add to <FavoriteBorderOutlinedIcon/></Button>
                  </Card.Body>
                  </Card>
                  : 
                  <>
                  <Alert variant='info' className='mt-2'>
                    <h5>Select a Product</h5>
                  </Alert>
                  </>
                  }
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Compare
