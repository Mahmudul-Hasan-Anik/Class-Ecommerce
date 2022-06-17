import express from 'express'
import User from '../modals/userModals.js'
import bcrypt from 'bcrypt';
import { generateToken } from './utils.js';

const Auth = express.Router()

Auth.post('/signin', async(req,res)=>{
    const auth = await User.findOne({email: req.body.email})

    if(auth){
        if(bcrypt.compareSync(req.body.password, auth.password)){
            res.send({
                _id: auth._id,
                name: auth.name,
                email: auth.email,
                isAdmin: auth.isAdmin,
                isVandor: auth.isVandor,
                isAffilate: auth.isAffilate,
                token: generateToken(auth)
            })
            return
        }
    }
    res.status(401).send({msg:'Invalid Password or Email'})
})


Auth.post('/signup', async(req,res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    })

    const user = await newUser.save().then((user)=>{
        res.status(201).json({
            user,
            msg:'Registration Success'
        })
    }).catch((err)=>{
       res.status(400)
    })
})

Auth.put('/:id', async(req,res)=>{
    User.findByIdAndUpdate({_id: req.params.id}, {isVandor: true},{new:true} ,(err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'Data not send'})
        }
    })
})

Auth.put('/affiliate/:id', (req,res)=>{
    User.findByIdAndUpdate({_id: req.params.id}, {isAffilate: true}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'Affilate not Find'})
        }
    })
})

export default Auth