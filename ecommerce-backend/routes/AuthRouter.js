import express from 'express'
import User from '../modals/userModals.js'
import bcrypt from 'bcrypt';
import { generateToken } from './utils.js';
import Role from '../modals/userRole.js';
import AdminRoleAssign from '../modals/AdminRole.js';

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

//---------- For Admin User (start) ---------- //
Auth.get('/userlist', async(req,res)=>{
    const user = await User.find({})
    res.send(user)
})

Auth.post('/delete/:id', async(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json({msg:'User Not Delete'})
        }
    })
})

//---------- For Admin User (End) ---------- //

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


//------------ ROLE MANAGE ---------//
Auth.post('/userrole', (req,res)=>{
    const newRole = new Role({
        name: req.body.name,
        permission: req.body.permission
    })
    newRole.save().then(()=>{
        res.status(200).send()
    }).catch((err)=>{
        res.status(400).json({msg:'Role Creation Failed...'})
    })
})

Auth.get('/userrole', (req,res)=>{
    Role.find({}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.send(err)
        }
    })
})

Auth.post('/assignrole', (req,res)=>{
    const newAssign = new AdminRoleAssign({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        roleAssign: req.body.roleAssign
    })
     const assign = newAssign.save()
        res.send(assign)
})

//============= ADMIN LOGIN ================//

Auth.post('/adminsignin', async(req,res)=>{
    const auth = await AdminRoleAssign.findOne({email: req.body.email})

    if(auth){
        if(bcrypt.compareSync(req.body.password, auth.password)){
            res.send({
                _id: auth._id,
                email: auth.email,
                token: generateToken(auth)
            })
            return
        }
    }
    res.status(401).send({msg:'Invalid Password or Email'})
})

export default Auth