import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type: 'string', required: true},
    description:{type: 'string'},
    price: {type: 'string', required: true},
    image: {type:'string'},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:"User"}
})

const Product = mongoose.model('Product', productSchema);

export default Product;