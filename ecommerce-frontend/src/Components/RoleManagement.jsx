import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {Row,Col,Tabs,Tab,Form,Button} from 'react-bootstrap'
import AdminNav from './AdminNav'

const RoleManagement = () => {
    const [name, setName] = useState('')
    const [roles, setRoles] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [assignRole, setAssignRole] = useState('')
    
   
    const roleList = []

    const handleProductUpload = ()=>{
        if(roleList.indexOf('productupload') !== -1){
            roleList.splice(roleList.indexOf('productupload'), 1)
        }else{
            roleList.push('productupload')
        }
    }
    const handleCatagoryUpload = ()=>{
        if(roleList.indexOf('catagoryupload') !== -1){
            roleList.splice(roleList.indexOf('catagoryupload'), 1)
        }else{
            roleList.push('catagoryupload')
        }
    }
    const handleBrandUpload = ()=>{
        if(roleList.indexOf('brandupload') !== -1){
            roleList.splice(roleList.indexOf('brandupload'), 1)
        }else{
            roleList.push('brandupload')
        }
    }
    const handleBlogUpload = ()=>{
        if(roleList.indexOf('writeblog') !== -1){
            roleList.splice(roleList.indexOf('writeblog'), 1)
        }else{
            roleList.push('writeblog')
        }
    }
    const handleProductApprove = ()=>{
        if(roleList.indexOf('productapprove') !== -1){
            roleList.splice(roleList.indexOf('productapprove'), 1)
        }else{
            roleList.push('productapprove')
        }
    }

    const handleRole = (e)=>{
        e.preventDefault()
        
        axios.post('/api/auth/userrole', {
            name: name,
            permission: roleList
        }).then(()=>{
            setName('')
            roleList = []
        })
    }

    const handleAssignRole = async(e)=>{
        e.preventDefault()

        await axios.post('/api/auth/assignrole', {
            email: email,
            password: password,
            roleAssign: assignRole
        })

        console.log(assignRole)
    }

    useEffect(()=>{
        async function fatchData(){
            const {data} = await axios.get('/api/auth/userrole')
            setRoles(data)
        }
        fatchData()
    },[])

  return (
    <div style={{marginLeft:'10px'}}>
    <Row>
        <Col lg={2} className='admin_menu-main'>
            <AdminNav active='role'/>
        </Col>
        <Col lg={10}>
        <Tabs
        defaultActiveKey="profile"
        className="mb-3"
        >
            <Tab eventKey="rolelist" title="Role List">
                fds
            </Tab>

            <Tab eventKey="assignrole" title="Assign Role">
              <Form style={{width:'900px'}}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Select className="mb-3" onChange={(e)=>setAssignRole(e.target.value)}>
                    <option>Role Assign</option>
                    {roles.map((item)=>(
                         <option value={item._id}>{item.name}</option>
                    ))}
                </Form.Select>

                <Button variant="primary" type="submit" onClick={handleAssignRole}>
                    Submit
                </Button>
              </Form>
            </Tab>

            <Tab eventKey="createrole" title="Create Role">
               <Form style={{width:'1100px'}}> 
                   <Form.Group className="mb-3" controlId="formBasicEmail">
                       <Form.Label>Create Role</Form.Label>
                       <Form.Control type="text" placeholder="Enter email"  onChange={(e)=>setName(e.target.value)} value={name}/>
                   </Form.Group>

                   <Form.Check 
                        label="Product Upload"
                        name="productupload"
                        type='checkbox'
                        onChange={handleProductUpload}
                    />
                    <Form.Check
                        label="Catagory Upload"
                        name="catagoryupload"
                        type='checkbox'
                        onChange={handleCatagoryUpload}
                    />
                    <Form.Check
                        label="Brand Upload"
                        name="brandupload"
                        type='checkbox'
                        onChange={handleBrandUpload}
                    />
                    <Form.Check
                        label="Write Blog"
                        name="writeblog"
                        type='checkbox'
                        onChange={handleBlogUpload}
                    />
                    <Form.Check
                        label="Product Approve"
                        name="productapprove"
                        type='checkbox'
                        onChange={handleProductApprove}
                    />
                    
                   <Button variant="primary" type="submit" className='mt-3' onClick={handleRole}>
                       Submit
                   </Button>
               </Form>
            </Tab>
        </Tabs>
        </Col>
    </Row>
</div>
  )
}

export default RoleManagement