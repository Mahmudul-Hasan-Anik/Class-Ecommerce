import { createContext,useReducer } from "react";
const Store = createContext()

const initialState = {
    cart:{
        cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): []
    }
}


function reducer(state,action){
    switch(action.type){
        case 'ADD_CART_ITEM':
            const newItems = action.payload
            const existingItems = state.cart.cartItems.find((item)=> item._id === newItems._id)
            
            const cartItems = existingItems ? state.cart.cartItems.map((item)=> item._id === existingItems._id ? newItems : item)
            : [...state.cart.cartItems, newItems]

            localStorage.setItem('cart', JSON.stringify(cartItems))
            return {...state, cart:{...state.cart, cartItems}}

        case 'CLEAR_CART':
            { 
               return {...state, cart:{...state.cart, cartItems:[]}}
            }
        
        case 'REMOVE_CART_ITEM':
            {
                const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id) 

                localStorage.setItem('cart', JSON.stringify(cartItems))
                return {...state, cart:{...state.cart, cartItems}}
            }   

        default: return state
            
    }
} 


/// =========== FOR WISH LIST =============== ///

const  initialState2 = {
    wishList:{
        wishListItems: localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')): []
    }
}


function reducer2(state,action){
    switch(action.type){
        case 'WISHLIST_CART_ITEM':
            const newItems = action.payload
            const existingItems = state.wishList.wishListItems.find((item)=> item._id === newItems._id)
            
            const wishListItems = existingItems ? state.wishList.wishListItems.map((item)=> item._id === existingItems._id ? newItems : item)
            : [...state.wishList.wishListItems, newItems]

            localStorage.setItem('wishListItems', JSON.stringify(wishListItems))
            return {...state, wishList:{...state.wishList, wishListItems}}
        
        case 'REMOVE_WISHLIST_ITEM':
            {
                const wishListItems = state.wishList.wishListItems.filter((item)=> item._id !== action.payload._id) 

                localStorage.setItem('wishList', JSON.stringify(wishListItems))
                return {...state, wishList:{...state.wishList, wishListItems}}
            }   

        default: return state
            
    }
}
/// =========== FOR USER =============== ///

const  userState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
    
}

function userReducer(state,action){
    switch(action.type){
        case 'USER_SIGNIN': 
                return {...state, userInfo: action.payload}   
        case 'USER_LOGOUT': 
                return {...state, userInfo: null}   
        default: 
                return state      
    }
    
}

// ===============FOR SHIPPING PAGE =============//
const  shippingState = {
    shipping:localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')): {}
    
}

function shippingReducer(state,action){
    switch(action.type){
        case 'SHIPPING_PAGE': 
                return {...state, shipping: action.payload}   
        default: 
                return state      
    }
}

// ===============FOR PAYMENT PAGE =============//
const  paymentState = {
    paymentMethod:localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')): ''
    
}

function paymentReducer(state,action){
    switch(action.type){
        case 'PAYMENT_METHOD': 
                return {...state, paymentMethod: action.payload}   
        default: 
                return state      
    }
}



const StoreProvider = (props)=>{
    const [state,dispatch] = useReducer(reducer,initialState)
    const [state2,dispatch2] = useReducer(reducer2,initialState2)
    const [state3,dispatch3] = useReducer(userReducer,userState)
    const [state4,dispatch4] = useReducer(shippingReducer,shippingState)
    const [state5,dispatch5] = useReducer(paymentReducer,paymentState)
    
    const value = {state,dispatch,state2,dispatch2,state3,dispatch3,state4,dispatch4,state5,dispatch5}

    return(
        <>
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
        </>
    )
}

export {Store, StoreProvider}