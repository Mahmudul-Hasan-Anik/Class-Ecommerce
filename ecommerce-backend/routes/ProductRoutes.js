import express from 'express'
import multer from 'multer'
import Product from '../modals/Database.js'
import User from '../modals/userModals.js'
import path from 'path'
import Affiliate from '../modals/AffiliateModals.js'
import RatingData from '../modals/Rating.js'

const ProductRouter = express.Router()

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
      owner: req.body.owner,
      rating: req.body.rating
    })

    await newProduct.save().then(()=>{
        res.status(200).json({msg:'Data sent Successful'})
    }).catch((err)=>{
        res.status(400).json({msg:'Data sent failed'})
    })
    
})

ProductRouter.get('/',   function (req, res) {
    Product.find({}).populate({path: 'ratings', model: RatingData}).exec(function(err,docs){
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'Data not send...'})
        }
    })
  })


ProductRouter.get('/:slug', async(req,res)=>{
    if(req.query.id){
        const user = await User.findById(req.query.id)
        if(user.isAffilate){
            const product = await Product.findOne({slug: req.params.slug})
            if(product){
                res.send(product)
    
                const affiliate = new Affiliate({
                    amount: (product.price*10)/100,
                    owner: req.query.id
                })
                affiliate.save()
            }
          
        }   
    }else{
            Product.findOne({slug: req.params.slug}, (err,docs)=>{
            if(docs){
                res.send(docs)
            }else{
                res.status(401).json({msg:'Slug not find'})
            }
        })
    }

})

//FOR AFFILIATE GET LINK
ProductRouter.get('/affiliate/info/:id',async(req,res)=>{
     const data = await Affiliate.find({owner: req.params.id})
     res.send(data)
})

//END AFFILIATE GET LINK

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


// FOR REVIEWS AND RATING

ProductRouter.post('/rating/:id',async(req,res)=>{
    console.log(req.body)
    
    const newRating = new RatingData({
        owner: req.body.owner,
        ratings: req.body.ratings,
        productId: req.body.productId,
        reviews: req.body.reviews
    })
    //  newRating.save()

     const testing2 = await RatingData.find({productId: req.params.id})

    testing2.map((item)=>{
        console.log(Number(item.ratings) + Number(req.body.ratings))
    })

})

ProductRouter.post('/delete/:id', (req,res)=>{
    Product.findByIdAndDelete({_id:req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'Product Not Delete'})
        }
    })
})



export default ProductRouter
