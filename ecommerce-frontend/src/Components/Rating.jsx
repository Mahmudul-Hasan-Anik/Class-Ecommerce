import React from 'react';
import {Badge} from 'react-bootstrap'


const BasicRating = ({rating,nameOfRating}) => {
  return (
    <div>
        <i color='red' class={rating >1?'fas fa-star': rating>.5?'fas fa-star-half-alt': 'far fa-star'}></i>
        <i class={rating >2?'fas fa-star': rating>1.5?'fas fa-star-half-alt': 'far fa-star'}></i>
        <i class={rating >3?'fas fa-star': rating>2.5?'fas fa-star-half-alt': 'far fa-star'}></i>
        <i class={rating >4?'fas fa-star': rating>3.5?'fas fa-star-half-alt': 'far fa-star'}></i>
        <i class={rating >5?'fas fa-star': rating>4.5?'fas fa-star-half-alt': 'far fa-star'}></i>
        <p>Rating: <Badge bg="secondary">{nameOfRating}</Badge></p>
        
    </div>
  );
};

export default BasicRating;





