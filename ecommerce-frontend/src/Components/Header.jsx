import React, { useContext,useEffect } from 'react';
import {Navbar,Container,Nav,Dropdown,DropdownButton} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom';
import { Store } from '../userContext';

import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonIcon from '@mui/icons-material/Person';


export const Header = () => {
  const navigate = useNavigate()
  const {state,state2,state3,dispatch3} = useContext(Store)

  const {userInfo} = state3
 

  const handleLogout = ()=>{
    dispatch3({type: 'USER_LOGOUT'})
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  const handleDashboard = ()=>{
    navigate('/signin?rediract=/dashboard')
  }

  const handleVandor = ()=>{
    navigate('/vandor')
  }

  const handleVartualCard = ()=>{
    navigate('/vartualCard')
  }

  const handleAffiliate = ()=>{
    navigate('/affiliate')
  }

  const handleGetAffiliate = ()=>{
    navigate('/getAffiliate')
  }

  const handleAdmin = ()=>{
    navigate('/admin')
  }

  return(
    <>
    <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand>Any <span style={{color:'red'}}>Mart</span></Navbar.Brand>
          <Nav className="me-auto menu">
            <Link to='/'>Home</Link>
            <Link to='/product'>Product</Link>
            <Link to='/compare'>Compare</Link>
            </Nav>
            
            <Nav className="ms-auto menu">
            <Link to='/navCart'>
              <Badge badgeContent={state.cart.cartItems.length > 0 ? state.cart.cartItems.length : '0'} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
            </Link>
            <Link to='/wishList'>
              <Badge badgeContent={state2.wishList.wishListItems.length > 0 ? state2.wishList.wishListItems.length : '0'} color="secondary">
                  <FavoriteBorderOutlinedIcon />
                </Badge>
            </Link>

            {userInfo? 
            <DropdownButton title={userInfo.name} variant='secondary' style={{paddingLeft:'20px'}}>
              {userInfo.isVandor ?
                <Dropdown.Item className='profile_button' style={{background:'gray'}} onClick={handleDashboard}>
                  Dashboard
                </Dropdown.Item>
              :
                <Dropdown.Item className='profile_button mt-2' style={{background:'gray'}} onClick={handleVandor}>
                  Become A vandor
                </Dropdown.Item>
              }

              {userInfo.isAffilate ?
                <Dropdown.Item className='profile_button mt-2' style={{background:'gray'}} onClick={handleGetAffiliate}>
                   Get Affiliate Link
                </Dropdown.Item>
               :
                <Dropdown.Item className='profile_button mt-2' style={{background:'gray'}} onClick={handleAffiliate}>
                  Become a Affiliate
                </Dropdown.Item>
              }
              
              <Dropdown.Item className='profile_button mt-2' style={{background:'gray'}} onClick={handleVartualCard}>
                 Vartual Card
              </Dropdown.Item>
              {userInfo && 
                  userInfo.isAdmin 
                    &&
                    <Dropdown.Item className='profile_button mt-2' style={{background:'gray'}} onClick={handleAdmin}>Admin</Dropdown.Item>
              }
              
              <Dropdown.Divider />
              <Dropdown.Item className='profile_button' style={{background:'gray'}} onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
            :
            
            <Link to='/signin?rediract=/shipping'>
                  <PersonIcon />
            </Link>
            }
          </Nav>
          </Container>
    </Navbar>
    </>
  );
};
