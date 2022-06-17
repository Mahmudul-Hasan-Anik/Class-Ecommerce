import express from 'express'
import productData from './data.js'
import discount from './discount.js';
import ProductRouter from './routes/ProductRoutes.js'
import seedRouter from './routes/seedRoutes.js';
import Auth from './routes/AuthRouter.js';
import 'dotenv/config'
import OrderRouter from './routes/OrderRouter.js';

import mongoose from 'mongoose';
import Product from './modals/Database.js';
import StoreRouter from './routes/StoreRoutes.js';
import VartualRouter from './routes/VartualRoutes.js';
import path from 'path';
import {fileURLToPath } from 'url'

const app = express()

mongoose.connect(process.env.MONGO_DB_URL, ()=>{
  console.log('Database Connected')
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const __filename = fileURLToPath(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/upload", express.static(path.join(__dirname, 'uploads'))); 

app.use('/api/seed', seedRouter)
app.use('/product', ProductRouter)
app.use('/api/auth', Auth)
app.use('/api/orders', OrderRouter)
app.use('/api', StoreRouter)
app.use('/api', VartualRouter)


//paypal
app.get('/api/keys/paypal', (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT || 'sb')
})


app.get('/discount', (req, res)=>{
  res.send(discount)
})

app.get('/catagory/:catagory', (req, res)=>{
  let catArray = []

  productData.find((item)=>{
    if(item.catagory == req.params.catagory ){
      catArray.push(item)
    }
  })
  res.send(catArray)
  console.log(catArray)
})



let port = process.env.PORT || 8000


app.get('/',  (req, res)=> {
  res.send('Hello World')
})

app.listen(port, ()=>{
  console.log(`I am Port ${port}`)
})