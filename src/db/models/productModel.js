import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {type: String, require: [true, "Title Required"] },
    description: { type: String, required: [true, "Description Required"] },    
    price: { type: Number, required: [true, "Price Required"] },
    status: { type: Boolean, default: true},
    stock: { type: Number, required: [true, "Stock Required"] },
    category: { type: String, required: [true, "Category Required"] },
    thumbnail: { type: String, required: [true, "Thumbnail Required"] },
});

export default productSchema;