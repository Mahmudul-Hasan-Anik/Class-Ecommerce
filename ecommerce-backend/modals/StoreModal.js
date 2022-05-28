import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StoreNameSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const StoreName = mongoose.model('storeName', StoreNameSchema)
export default StoreName