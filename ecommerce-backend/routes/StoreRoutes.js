import express from 'express'
import StoreName from '../modals/StoreModal.js'

const StoreRouter = express.Router()

StoreRouter.post('/store', async(req,res)=>{
    const newStore = new StoreName({
        name: req.body.name,
        creator: req.body.creator
    })

    await newStore.save().then(()=>{
        res.status(200).json({msg:'Data send database'})
    }).catch(()=>{
        res.status(400).json({msg: 'Data send Failed'})
    })

})

export default StoreRouter