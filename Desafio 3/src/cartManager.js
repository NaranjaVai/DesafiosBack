const fs = require('fs');

class CartManager {

    constructor() {
        this.cart = [];
        this.path = '/carrito.json'
    }

    async autoId(){
        let result = await this.getProducts();
        return ((result[this.cart.length - 1].id) + 1);
    }

    async getCart() {
        try {
            let result =  JSON.parse( await fs.promises.readFile(this.path, 'utf-8'));
            return result;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getProductsListById(id) {
        let result = await this.getCart();
        try {
            let productList = result.find(e => e.id == id);
            return productList;
        } catch (error) {
            return { error: error.message }
        }
    }

    async createCart() {
        let aux = await this.getCart();
        try {
            aux.push({
                id: await this.autoId(),
                products: []
            })
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
        } catch (e) {
            return { error: e.message }
        }
    }

    async addToCart(id, product) {
        let quantity = 1;
        let prod = {
            product: product.id,
            quantity: quantity
        }
        let result = await this.getCart();
        try {
            let aux = result.find(e => e.id == id);
            if (aux[id].products.product == product.id) {
                aux[id].products.quantity += 1
                result[id] = aux;
                await fs.promises.writeFile(this.path, JSON.stringify(result));
            } else {
                aux[id].products = prod;
                result[id] = aux;
                await fs.promises.writeFile(this.path, JSON.stringify(result));
            }
        } catch (e) {
            return { error: e.message }
        }
    }



}
module.exports = CartManager;