import express from 'express'
import Product from '../modals/Database.js'
import User from '../modals/userModals.js'
import productData from '../data.js'
import userData from '../userData.js'

const seedRouter = express.Router()

seedRouter.get('/', async(req,res)=>{
    await Product.deleteMany({})
    const product = await Product.insertMany(productData)
    res.send(product)
})

seedRouter.get('/user', async(req,res)=>{
    await User.deleteMany({})
    const user = await User.insertMany(userData)
    res.send(user)
})

export default seedRouter

