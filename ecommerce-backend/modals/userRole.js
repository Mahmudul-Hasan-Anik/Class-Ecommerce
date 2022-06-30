import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    permission: [{
        type: String
    }]
})

const Role = mongoose.model('role', userRoleSchema)
export default Role