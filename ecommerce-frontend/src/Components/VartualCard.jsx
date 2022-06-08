import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button,Row,Col } from 'react-bootstrap'
import {Store} from '../userContext'


const VartualCard = () => {
    const [payment, setPayment] = useState('')
    const [amount, setAmount] = useState('')
    const [value, setValue] = useState([]) 

    const {state3} = useContext(Store)
    const {userInfo} = state3

    //MODEL RELATED STATE START
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
     //MODEL RELATED STATE END

    const handleAddmoney = (e)=>{
        e.preventDefault()
       
        // axios.post('/api/card',{
        //     amount: amount,
        //     source: payment,
        //     owner: userInfo._id
        // })

        axios.patch(`/api/card/update/${value._id}`,{
            amount: amount,
        })
    }

    useEffect(()=>{
        async function fatchData(){
           const {data} = await axios.get('/api/card')
           setValue(data)
        }
        fatchData()

    },[])

    const handleShow = (e)=>{
        console.log(e.target.value)
        setShow(true)
    }

  return (
    <>
        <Row>
        <Col className='vartual_card-sidebar' md='2'>
            <h5>{userInfo.name}</h5>    
            <p>Balance : ${value.amount} </p>
        </Col>
       

        <Col className='vartual_card-main mt-5' md='6'>
            <h4>Add Money</h4>

        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>Enter Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter Amount" onChange={(e)=>setAmount(e.target.value)}/>
            </Form.Group>
            
            <Form.Label>Select Your Add Money Source</Form.Label>
            <Form.Group className='mb-3'>
                <Form.Check
                    inline
                    label="paypal"
                    id="paypal"
                    type='checkbox'
                    value='paypal'
                    checked={payment == 'paypal'}
                    onChange={(e)=>setPayment(e.target.value)}
                    onClick={handleShow}
                />
                <Form.Check
                    inline
                    label="Strip"
                    id="Strip"
                    type='checkbox'
                    value='strip'
                    checked={payment == 'strip'}
                    onChange={(e)=>setPayment(e.target.value)}
                    onClick={handleShow}
                />
                <Form.Check
                    inline
                    label="Datch Bangla"
                    id="DatchBangla"
                    type='checkbox'
                    value='datchBangla'
                    checked={payment == 'datchBangla'}
                    onChange={(e)=>setPayment(e.target.value)}
                    onClick={handleShow}
                />
            </Form.Group>
           
            <Button type="submit" style={{background:'aquamarine',border:'none',width:'100%',color:'black'}} onClick={handleAddmoney}>
                Recharge
            </Button>
        </Form>
        </Col>
        </Row>


        {/* //-----------------SHOW RECHARGE---------------// */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Money From your selected Source</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        </Modal>
    </>
  )
}

export default VartualCard