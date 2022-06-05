import express from 'express'
import multer from 'multer'
import Product from '../modals/Database.js'
import path from 'path'

const ProductRouter = express.Router()

ProductRouter.get('/', async(req, res)=>{
    const product = await Product.find()
    res.send(product) 
})

//FILE UPLOADING CODE START HERE
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname
                             .replace(fileExt, '')
                             .split(' ')
                             .join('-') + '-' + Date.now()

        cb(null, fileName + fileExt)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 2000000 // 2MB
    },
    fileFilter: (req, file, cb)=>{
        if(
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ){
            cb(null, true)
        }else{
            cb(new Error('Only png, jpg and jpeg allowed'))
        }
    }
})

//FILE UPLOADING CODE END HERE
ProductRouter.post('/', upload.single('image'), async(req,res)=>{
    const url = req.protocol + "://" + req.get("host");
    const fileUrl = url + "/upload/" + req.file.filename;
    
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      slug: req.body.slug,
      image: fileUrl,
      desciption: req.body.desciption,
      stock: req.body.stock,
      catagory: req.body.catagory,
      coupon: req.body.coupon,
      discount: req.body.discount,
      discountLimit: req.body.discountLimit,
      owner: req.body.owner
    })
    await newProduct.save().then(()=>{
        res.status(200).json({msg:'Data sent Successful'})
    }).catch((err)=>{
        res.status(400).json({msg:'Data sent failed'})
    })
    
})

ProductRouter.get('/', async(req,res)=>{
    Product.find({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'Data sent failed'})
        }
    })
})


ProductRouter.get('/:slug', (req,res)=>{
    Product.findOne({slug: req.params.slug}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(401).json({msg:'Slug not find'})
        }
    })
})

ProductRouter.get('/indivi/:id', (req,res)=>{
    Product.findById({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'ID not find'})
        }
    })
})

ProductRouter.get('/show/:owner', (req,res)=>{
    Product.find({owner: req.params.owner}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'ID not find'})
        }
    })
})




export default ProductRouter
