import React from 'react'
import { Row,Col} from 'react-bootstrap'
import AdminNav from './AdminNav'

const AdminDashboard = () => {
  return (
    <div style={{marginLeft:'10px'}}>
        <Row>
            <Col lg={2} className='admin_menu-main'>
                <AdminNav />
            </Col>
            <Col lg={10}>
                <h3>Welcome Admin Dashboard. You Have Super Power for doing anything</h3>
            </Col>
        </Row>
    </div>
  )
}

export default AdminDashboard