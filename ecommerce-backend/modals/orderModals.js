import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    orderItems:[
        {
                slug:{
                    type: String,
                    required: true
                },
                name:{
                    type: String,
                    required: true
                },
                quantity:{
                    type: Number,
                    required: true
                },
                img:{
                    type: String,
                    required: true
                },
                price:{
                    type: Number,
                    required: true
                },
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    // required:true
                }
        }
    ],

    shippingAddress:{
            name:{
                type: String,
                required: true
            },
            address:{
                type: String,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            post:{
                type: String,
                required: true
            },
            country:{
                type: String,
                required: true
            }
    },
    paymenOption:{
        type: String,
        required: true
    },
    paymentResult:{
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    productPrice:{
        type: Number,
        required: true
    },
    shippingPrice:{
        type: Number,
        required: true
    },
    tax:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    },
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required:true  
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    delivariedAt:{
        type: Date
    },
    paidAt:{
        type: Date
    }

},
{
    timestamps: true
}
)

const Order = mongoose.model('orders', OrderSchema)
export default Order

