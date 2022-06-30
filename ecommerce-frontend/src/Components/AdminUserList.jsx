import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Row,Col,Table, Button} from 'react-bootstrap'
import AdminNav from './AdminNav'
import {toast} from 'react-toastify'

const AdminUserList = () => {
    const [user, setUser] = useState([])

    useEffect(()=>{
        async function fatchData(){
            const {data} = await axios.get('/api/auth/userlist')
            setUser(data)
        }
        fatchData()
    },[])

    const handleDelete = (id)=>{
        axios.post(`/api/auth/delete/${id}`).then(()=>{
            toast.success('User Delete Successfully')
        })
    }

  return (
    <div style={{marginLeft:'10px'}}>
        <Row>
            <Col lg={2} className='admin_menu-main'>
                <AdminNav active='userlist'/>
            </Col>
            <Col lg={10} >
            <Table striped bordered hover size="sm" style={{width:'1100px'}}>
            <thead>
                <tr style={{textAlign:'center'}}>
                <th>Serial</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {user.map((item,index)=>(
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.isAffilate ? 'Affilate':''}{item.isVandor? 'Vandor':''}</td>
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

export default AdminUserList