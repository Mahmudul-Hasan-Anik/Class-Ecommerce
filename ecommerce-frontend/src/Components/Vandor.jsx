import React, { useContext, useState } from 'react'
import { Button, Container,Form } from 'react-bootstrap'
import { Store } from '../userContext'
import axios from 'axios'

const Vandor = () => {
    const [agreement, setAgreement] = useState(false)
    const {state3,dispatch3} = useContext(Store)
    const {userInfo} = state3


    const handleSubmit = ()=>{
        axios.put(`/api/auth/${userInfo._id}`).then((data)=>{

            dispatch3({type: 'USER_SIGNIN', payload: data.data})
            localStorage.setItem('userInfo', JSON.stringify(data.data))
        })
    }

  return (
    <Container>
        <p className='mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestias iusto aperiam qui, illum harum nobis blanditiis commodi veniam! Maiores.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestias iusto aperiam qui, illum harum nobis blanditiis commodi veniam! Maiores.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus molestias iusto aperiam qui, illum harum nobis blanditiis commodi veniam! Maiores.
        </p>
        <Form.Check 
            type='checkbox'
            label='Accept Agreement'
            onChange={(e)=>setAgreement(e.target.checked)}
        />
        {agreement 
        ? 
        <Button className='mt-3' onClick={handleSubmit}>Submit</Button>
        :
        <Button className='mt-3' disabled>Submit</Button>
        }
        
    </Container>
  )
}

export default Vandor