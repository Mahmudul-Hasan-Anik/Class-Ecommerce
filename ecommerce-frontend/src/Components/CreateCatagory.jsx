import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

const CreateCatagory = () => {
  return (
    <div>
        <Container>
        <Form style={{width:'500px',margin:'0 auto'}}>
            <Form.Group className="mb-3">
                <Form.Label>Create Catagory</Form.Label>
                <Form.Control type="text" placeholder="Enter Catagory" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Container>
    </div>
  )
}

export default CreateCatagory