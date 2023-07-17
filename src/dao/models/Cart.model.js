import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import populate from "dotenv";

const CartSchema = new Schema({
    products: {
        type: [
            {
                product : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product'
                }
            }
        ]
    }
}, {
    versionKey : false
})

CartSchema.pre('find', function(){
    this.populate('products.product')
})

const Cart = mongoose.model('cart', CartSchema)

export { Cart }