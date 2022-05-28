import Jwt from 'jsonwebtoken'

export const generateToken = (user)=>{
    return Jwt.sign({user},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })
}  

export const isAuth = (req,res,next)=>{
    const authoraization = req.headers.authoraization
    
    if(authoraization){
        const token = authoraization.slice(7, authoraization.length)
        Jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err,decode)=>{
                if(err){
                    res.status(401).send({msg: 'Invalid Token'})
                }else(
                    req.users = decode,
                    next()
                )
            }
        )
    }else{
        res.status(401).send({msg:'No Token'})
    }
}