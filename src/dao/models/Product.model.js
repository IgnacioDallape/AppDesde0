import mongoose, { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';


const ProductsSchema = new Schema({
    name : {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true
    },
    price:{
        type: Number,
        required: true
    },
    stock : {
        type: Number,
        required: true
    }
}, {
    versionKey: false
})

ProductsSchema.plugin(paginate)

const Products = mongoose.model('product', ProductsSchema)

export {Products}

