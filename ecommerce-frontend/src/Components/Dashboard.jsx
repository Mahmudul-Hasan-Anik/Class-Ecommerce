import React,{useContext, useEffect, useState,useRef} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { Store } from '../userContext'
import { Row, Col, Nav,Form, Button } from 'react-bootstrap'
import axios from 'axios'
import {  toast } from 'react-toastify';
import MyEditor from './MyEditor'


const Dashboard = () => {
    const nagivate = useNavigate()
    const {state3} = useContext(Store)
    const {userInfo} = state3
    
    const [file, setFile] = useState('')
    const [showStore, setShowStore] = useState(false)
    const [store, setStore] = useState('')

    const [showProduct, setShowProduct] = useState(false)
    const [value, setValue] = useState({
      name: '',
      price: '',
      slug: '',
      desciption: '',
      stock: '',
      catagory:'',
      coupon: '',
      discount: '',
      discountLimit: ''

    })


    useEffect(()=>{
        if(!userInfo){
            nagivate('/signin?rediract=/dashboard')
        }
    })

  // Store Creation
    const handleStore = ()=>{
      setShowStore(true)
      setShowProduct(false)
    }
    const handleStoreSubmit = async(e)=>{
      e.preventDefault()

      if(!store){
        toast.error('Please Fill input box')
      }else{
        await axios.post('/api/store', {
          name: store,
          creator: userInfo._id
        }).then(()=>{
          toast.success('Store Creation Successful')
          setStore('')
        })  
      }
    }

  // Product Creation
  const handleProduct = ()=>{
    setShowProduct(true)
    setShowStore(false)
  }

  const handleChange = (e) =>{
    setValue({...value, [e.target.name]: e.target.value})
  }

  const handleProductSubmit = async(e)=>{
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', value.name)
    formData.append('price', value.price)
    formData.append('slug', value.slug)
    formData.append('image', file)
    formData.append('stock', value.stock)
    formData.append('catagory', value.catagory)
    formData.append('coupon', value.coupon)
    formData.append('discount', value.discount)
    formData.append('discountLimit', value.discountLimit)
    formData.append('desciption', value.desciption)
    formData.append('owner', userInfo._id)

    await axios.post('/product', formData)
  }

  // Show your product
  const handleYourProduct = ()=>{
    console.log('click')

    nagivate('/showPro')
  }

 
  return (
    <div>
      <div className='dashboard_header'>
        <h3 >My Profile</h3>
        <h5 >{userInfo.name}</h5>
        <Link to='/'>Go Back Home</Link>
      </div>

      <Row>
        <Col  md={2} className='dashboard_nav-div'>
          <Nav className="flex-column">

            <Nav.Link onClick={handleYourProduct}>Your Product</Nav.Link>
            <Nav.Link onClick={handleStore}>Store</Nav.Link>
            <Nav.Link onClick={handleProduct}>Create Product</Nav.Link>
            <Nav.Link >Payment</Nav.Link>
            <Nav.Link ><Link to='/createCatagory'>Create Catagory</Link></Nav.Link>
          </Nav>
        </Col>

        <Col  md={8} >
          {showStore 
          &&

            <Form className="p-3">
                <Form.Group className="mb-3" >
                  <Form.Label>Create Store Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setStore(e.target.value)} value={store}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleStoreSubmit}>Submit</Button>
            </Form>
          }

          {showProduct 
          &&

          <Form className=" product_from" >
            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Product Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Enter Name"  onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Price</Form.Label>
                <Form.Control name='price' type="number" placeholder="Price"  onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Slug</Form.Label>
                <Form.Control name='slug' type="text" placeholder="Enter Product Slug"  onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Product Image</Form.Label>
                <Form.Control name='image' type="file" placeholder="upload image"  onChange={(e)=>setFile(e.target.files[0])} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Stock</Form.Label>
                <Form.Control name='stock' type="number" placeholder="Product Stock"  onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Catagory</Form.Label>
                <Form.Control name='catagory' type='text' placeholder='Product Catagory' onChange={handleChange} />
              </Form.Group>
            </Row>


            <Row className="mb-3">
              <Form.Group as={Col} >
                <Form.Label>Coupon</Form.Label>
                <Form.Control name='coupon' type='text' placeholder='Enter Coupon' onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Discount</Form.Label>
                <Form.Control name='discount' type='number' placeholder='Product Discount' onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label>Discount Limit</Form.Label>
                <Form.Control name='discountLimit' type='number' placeholder='Discount Limit' onChange={handleChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" >
                <Form.Label>Product Desciption</Form.Label>
                <Form.Control name='desciption' type="text" placeholder="Enter Desciption"  onChange={handleChange} />
            
                  {/* <MyEditor name='desciption' onChange={handleChange}/> */}
             
              </Form.Group>

            <Button variant="primary" type="submit" onClick={handleProductSubmit}>
              Submit
            </Button>
          </Form>
          }
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard