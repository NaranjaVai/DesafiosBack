import mongoose from "mongoose";
import ProductsMongoDb from "../db/products.dao.js"
import productSchema from "../db/models/products.model.js"
const db = "ecommerce"
const productDAO = new ProductsMongoDb('products', productSchema)

mongoose.connect(`mongodb+srv://NaranjaVai:QwDRnfXylFfym8YT@clusternaranja.76pafxs.mongodb.net/${db}?retryWrites=true&w=majority`, error => {
    if (error) {
        console.log('Cannot connect to database please retry')
        process.exit()
    }
});

class CartsMongoDb {

    constructor(collection, schema) {
        this.cartsCollection = mongoose.model(collection, schema);
    }

    async getCarts() {
        try {
            let carts = await this.cartsCollection.find().lean()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    createCart() {
        try {
            let result = new this.cartsCollection
            let newCart = result.save()
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductCart(id, pId) {
        try {
            const cartById = await this.cartsCollection.findOne({ _id: id })
            if (!cartById) {
                return `no existe un carrito con el id: ${id}`
            }

            const productById = await productDAO.getProductById({ _id: pId })
            if (!productById) {
                return `no existe un producto con el id: ${pId}`
            }

            const aux = cartById.products.findIndex(e => String(e.product) === pId)
            if(aux >= 0) {
                cartById.products[aux].qt += 1
            } else {
                const newP = {product: pId}
                cartById.products.push(newP)
            }

            const saveCart = await cartById.save()
            return saveCart.products
        }
        catch (error) {
            console.log(error)
        }
    }

    async getProductsInCart(cartId) {
        try{
            const cartById = await this.cartsCollection.findOne({ _id: cartId }).lean()
                    .populate("products.product")
            if(!cartById){
                return `no existe un carrito con el id: ${cartId}`
            }
            const prod = cartById.products
            return prod
            
        }catch (error) {
            console.log(error)
        }
    }
};


export default CartsMongoDb;