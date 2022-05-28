import { Box, Step, StepLabel, Stepper } from '@mui/material'
// import React, { useContext,useEffect,useState } from 'react'
// import { Store } from '../userContext'

const CheckOut = (props) => {
  return (
    <>
   <Box sx={{ width: '100%',m:4}}>
      <Stepper activeStep={props.step} alternativeLabel>
          <Step>
            <StepLabel>Sign In</StepLabel>
          </Step>
          <Step>
            <StepLabel>Shipping</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
          <Step>
            <StepLabel>Place Order</StepLabel>
          </Step>
      </Stepper>
    </Box>
    </>
  )
}

export default CheckOut