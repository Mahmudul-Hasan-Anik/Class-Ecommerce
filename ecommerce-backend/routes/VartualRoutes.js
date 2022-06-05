import express from 'express'
import VartualCard from '../modals/Vartual.js'
const VartualRouter = express.Router()

VartualRouter.post('/card', (req,res)=>{
    const newCard = new VartualCard({
        amount: req.body.amount,
        source: req.body.source,
        owner: req.body.owner
    })

    newCard.save().then(()=>{
        res.status(200).send({msg:'Data sent successful'})
    }).catch((err)=>{
        res.status(400).send({msg:'Data sent failed'})
    })
    console.log(req.body)
})

VartualRouter.get('/card',(req,res)=>{
    VartualCard.find({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).send(err)
        }
    })
})

VartualRouter.put('/card/update', (req,res)=>{
    // VartualCard.findByIdAndUpdate({owner: req.body.id})
    console.log(req.body.owner)
})

//FOR UPDATE AFTER PAYMENT
VartualRouter.post('/card/:id', (req,res)=>{

    VartualCard.findOne({owner:req.params.id}, (err,docs)=>{      
        if(docs){
            VartualCard.findOneAndUpdate({owner: req.params.id}, {amount: (docs.amount -  req.body.price) },{new: true}, (err,onnoName)=>{
                if(onnoName){
                   res.send(onnoName)
                }
            })
        }else{
            console.log(err)
        }
    })

})



export default VartualRouter