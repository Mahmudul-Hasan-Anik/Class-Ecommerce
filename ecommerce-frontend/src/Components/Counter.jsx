import React from 'react';
import { useReducer } from 'react';
import {Button,ButtonGroup } from 'react-bootstrap';

//REDUCER FUNCTION
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
       return state
    }
  }

const Counter = () => {

    const [{count}, dispatch] = useReducer(reducer, {
        count: 0
    });

  return (
    <>
    
          <ButtonGroup style={{width:'50px',marginRight:"20px",height:'25px'}}>
          <button onClick={() => dispatch({type: 'decrement'})} style={buttonStyle}>-</button>

            <h5 style={{padding:'0px 10px',textAlign:'center'}}>{count < 1 ? '1':count}</h5>
            
          <button onClick={() => dispatch({type: 'increment'})} style={buttonStyle}>+</button>
          </ButtonGroup>
    </>
  );
};

const buttonStyle = {
  border:'none',
  hegiht:'20px'
}

export default Counter;
