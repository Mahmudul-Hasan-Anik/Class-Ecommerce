import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Form, Button,Row,Col } from 'react-bootstrap'
import {Store} from '../userContext'


const VartualCard = () => {
    const [payment, setPayment] = useState('')
    const [amount, setAmount] = useState('')
    const [value, setValue] = useState([]) 

    const {state3} = useContext(Store)
    const {userInfo} = state3
    console.log(userInfo.name)

    const handleAddmoney = (e)=>{
        e.preventDefault()
       
        // axios.post('/api/card',{
        //     amount: amount,
        //     source: payment,
        //     owner: userInfo._id
        // })

        axios.put(`/api/card/update`,{
            amount: amount,
            source: payment,
            owner: userInfo._id
        })
    }

    useEffect(()=>{
        async function fatchData(){
           const {data} = await axios.get('/api/card')
           setValue(data)
        }
        fatchData()
    },[])

   
  return (
    <>
<Row>
        <Col className='vartual_card-sidebar' md='2'>
            <h5>{userInfo.name}</h5>
            {value.map((item)=>(
                
                <p>Balance : ${item.amount} </p>
            ))}
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
                />
                <Form.Check
                    inline
                    label="Strip"
                    id="Strip"
                    type='checkbox'
                    value='strip'
                    checked={payment == 'strip'}
                    onChange={(e)=>setPayment(e.target.value)}
                />
                <Form.Check
                    inline
                    label="Datch Bangla"
                    id="DatchBangla"
                    type='checkbox'
                    value='datchBangla'
                    checked={payment == 'datchBangla'}
                    onChange={(e)=>setPayment(e.target.value)}
                />
            </Form.Group>
           
            <Button type="submit" style={{background:'aquamarine',border:'none',width:'100%',color:'black'}} onClick={handleAddmoney}>
                Recharge
            </Button>
        </Form>
        </Col>
        </Row>
    </>
  )
}

export default VartualCard