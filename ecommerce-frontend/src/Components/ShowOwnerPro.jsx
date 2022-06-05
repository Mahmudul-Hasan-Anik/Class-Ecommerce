import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import { Store } from '../userContext'
import {Button, Container, Table} from 'react-bootstrap'

const ShowOwnerPro = () => {
    const {state3} = useContext(Store)
    const {userInfo} = state3

    const [showPro, setShowPro] = useState([])

    useEffect(()=>{
        async function fatchData(){
            const {data} = await axios.get(`/product/show/${userInfo._id}`)
            console.log(data)
            setShowPro(data)
        }
        fatchData()
    },[])
  return (
    <Container>
      <Table striped bordered hover className='show_own_product'>
        <thead>
        <tr>
          <th>Serial</th>
          <th>Product Name</th>
          <th>Product Image</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>
      {showPro.map((item,index)=>(
        <tbody>
        <tr>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td><img src={item.image} style={{width:'70px',height:'70px'}}/></td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
          <td>
            <Button>Edit</Button>{' '}
            <Button variant='danger'>Delete</Button>
          </td>
        </tr>
      </tbody>  
      ))}
      </Table>
    </Container>
  )
}

export default ShowOwnerPro
