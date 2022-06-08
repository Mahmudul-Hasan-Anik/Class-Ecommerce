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
    VartualCard.findOne({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).send(err)
        }
    })
})

// UPDATE EXISTING BALANCE WITH NEW ONE
VartualRouter.patch('/card/update/:id', (req,res)=>{

    VartualCard.find({_id: req.params.id}, (err,docs)=>{
        const newBalance = {
            amount: Number(req.body.amount) + Number(docs[0].amount),
        }

    VartualCard.findByIdAndUpdate({_id: req.params.id}, newBalance,{new: true}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'Data not Update'})
        }
    })
  })
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