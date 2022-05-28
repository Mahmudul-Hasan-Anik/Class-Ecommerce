import express from 'express'
import Order from '../modals/orderModals.js'
import { isAuth } from './utils.js'
import Stripe from 'stripe';
import 'dotenv/config'

const OrderRouter = express.Router()

const stripe = new Stripe(process.env.STRIPE_CLIENT || '', null)

OrderRouter.post('/',isAuth, async(req, res)=>{
    const response = new Order({
        orderItems: req.body.orderItems.map((item)=>({...item, product: item._id})),
        shippingAddress: req.body.shippingAddress,
        paymenOption: req.body.paymenOption,
        productPrice: req.body.productPrice,
        shippingPrice: req.body.shippingPrice,
        tax: req.body.tax,
        totalPrice: req.body.totalPrice,
        users: req.body.users._id
    })
    
    const order = await response.save()
    res.status(201).send({msg:'Order Created', order})
})

OrderRouter.get('/:id',isAuth, async(req, res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        res.send(order)
    }else{
        res.status(404).send({msg:'Order Not Find'})
    }
})

OrderRouter.put('/:id/pay',isAuth, async(req, res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id: req.body.id,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save()
        res.send({msg:'Order Paid', updateOrder})
    }else{
        res.status(404).send({msg:'Order Not Found'})
    }

})

OrderRouter.post('/:id/payment',isAuth, async(req,res)=>{
    const {token = {}, amount = 0,} = req.body

    if(!Object.keys(token).length || !amount){
        res.status(400).send({msg:'Order Not Found'})
    }

    const{id: customerId} = await stripe.customer.create({
        email: token.email,
        source: token.id
    }).catch((e)=>{
        return null
    })

    const invoiceId = `${token.email}-${Math.random().toString()}-${Date.now().toString()}`
    
    const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: 'USD',
        customer: customerId,
        receipt_email: token.email,
        description: 'anymart payment'

    },{IdempotencyKey: invoiceId}).catch((e)=>{
        return null
        
    })

    if(!charge){
        res.status(500).send({msg: 'Order Not Found'})
    }

    res.status(200).send({msg:'Payment Done..'})

})


export default OrderRouter
