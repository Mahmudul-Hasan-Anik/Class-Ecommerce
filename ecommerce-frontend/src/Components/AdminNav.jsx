import React from 'react'
import { ButtonGroup,Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const AdminNav = (props) => {
  return (
    <ButtonGroup vertical className='admin_menu'>
        <Button active={props.active === 'userlist' ? true : false}>
           <Link to='/adminuserlist' style={{color:'white'}}>User List</Link>
        </Button>
        <Button active={props.active === 'product' ? true : false}>
          <Link to='/adminproduct' style={{color:'white'}}>Product List</Link>
        </Button>
        <Button active={props.active === 'role' ? true : false}>
          <Link to='/rolemanagement' style={{color:'white'}}>Role Assign</Link>
        </Button>
        <Button>Product Upload</Button>
        <Button>Catagory Upload</Button>
        <Button>Brand Upload</Button>
        <Button>Write Blog</Button>
        <Button>Product Approve</Button>
    </ButtonGroup>
  )
}

export default AdminNav