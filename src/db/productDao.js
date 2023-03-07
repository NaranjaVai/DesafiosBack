import mongoose from "mongoose";
const db = "ecommerce";

mongoose.connect(`mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/${db}?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log('Cannot connect to database please retry')
        process.exit()
    }
});

class ProductsMongoDb {

    constructor(collection, schema) {
        this.productsCollection = mongoose.model(collection, schema);
    }
    
    async createProduct(product) {
        try {
            let newProduct = new this.productsCollection(product)
            let result = await newProduct.save()
            return result
        } catch (error) {
            console.log(error);
        }
    }

    async getProducts() {
        try {
            let products = await this.productsCollection.find().lean()
            return products
        } catch (error) {
            console.log(error);
        }
    }


    async getProductById(id) {
        try{
            const product = await this.productsCollection.findOne({ _id: id }).lean()
            console.log(product)
            if(!product){
                return `no existe el producto con este id ${id}`
            }
            return product
        }
        catch (error) {
            console.log(error);
        }

    }
};


export default ProductsMongoDb;