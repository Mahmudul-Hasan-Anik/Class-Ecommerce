import mongoose from 'mongoose' 

const VartualSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true
})

const VartualCard = mongoose.model('Card', VartualSchema)
export default VartualCard