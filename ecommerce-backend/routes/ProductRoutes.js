import express from 'express'
import Product from '../modals/Database.js'

const ProductRouter = express.Router()

ProductRouter.get('/', async(req, res)=>{
    const product = await Product.find()
    res.send(product) 
})

ProductRouter.post('/', async(req,res)=>{
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      slug: req.body.slug,
      image: req.body.image,
      desciption: req.body.desciption,
      stock: req.body.stock,
      catagory: req.body.catagory,
      coupon: req.body.coupon,
      discount: req.body.discount,
      discountLimit: req.body.discountLimit
    })

    await newProduct.save().then(()=>{
        res.status(200).json({msg:'Data not send'})
    }).catch(()=>{
        res.status(400).json({msg: 'Data send failed'})
    })
})

// ProductRouter.get('/:slug', async(req, res)=>{

//     let product = await Product.findOne({slug: req.params.slug })
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({msg: 'Product not Found'})
//     }
//   })

  
//   ProductRouter.get('/:id', async(req, res)=>{

//     let product = await Product.find({_id: req.params._id })
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({msg: 'Product not Found'})
//     }

//   })

export default ProductRouter
