import React,{ useContext, useEffect,useState } from 'react'
import axios from 'axios'
import {Container, Table} from 'react-bootstrap'
import { Store } from '../userContext'


const GetAffiliate = () => {
    const {state3} = useContext(Store)
    const {userInfo} = state3
    const [value, setValue] = useState([])
    useEffect(()=>{
        async function fatchData(){
            const {data} = await axios.get(`/product/affiliate/info/${userInfo._id}`)
            setValue(data)
        }
        fatchData()
    },[])

    // console.log(value)
  return (
    <Container>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
            <th>Serial</th>
            <th>Product Amount</th>
            </tr>
        </thead>
        <tbody>
            {value.map((item,index)=>(
             <tr>
                <td>{index + 1}</td>
                <td>{item.amount}</td>
             </tr>   
            ))}
        </tbody>
        </Table>
    </Container>
  )
}

export default GetAffiliate