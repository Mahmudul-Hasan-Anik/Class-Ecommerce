import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Row,Col,Table, Button} from 'react-bootstrap'
import AdminNav from './AdminNav'

const AdminProduct = () => {
    const [product, setProduct] = useState([]) 

    useEffect(()=>{
        async function fatchData(){
          const {data} = await axios.get('/product')
          setProduct(data)
        }
        fatchData()
    },[])

    const handleDelete = (id)=>{
        axios.post(`/product/delete/${id}`)
    }

  return (
    <div style={{marginLeft:'10px'}}>
        <Row>
            <Col lg={2} className='admin_menu-main'>
                <AdminNav active='product'/>
            </Col>
            <Col lg={10}>
                <h3>Product</h3>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr style={{textAlign:'center'}}>
                    <th>Serial</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Catagory</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index)=>(
                    <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <img src={item.image} style={{width:'70px', height:'70px'}} />
                        </td>
                        <td>${item.price}.00</td>
                        <td>{item.catagory}</td>
                        <td>
                            <Button variant='danger' onClick={()=>handleDelete(item._id)}>Delete</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Col>
        </Row>
    </div>
  )
}

export default AdminProduct