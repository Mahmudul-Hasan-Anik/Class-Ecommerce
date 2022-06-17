import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    isVandor:{
        type: Boolean,
        default: false
    },
    isAffilate:{
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('users',userSchema)
export default User