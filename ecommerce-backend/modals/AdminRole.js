import mongoose from "mongoose";

const AdminRoleSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    roleAssign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    }
})

const AdminRoleAssign = mongoose.model('AdminRoleAssign', AdminRoleSchema)
export default AdminRoleAssign