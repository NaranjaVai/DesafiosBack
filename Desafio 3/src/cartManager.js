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
            let result = await JSON.parse(fs.promises.readFile(this.path, 'utf-8'));
            return result;
        } catch (error) {
            return { error: error };
        }
    }

    async getProductsListById(id) {
        try {
            let result = await this.getCart();
            let productList = result.find(e => e.id == id);
            return productList;
        } catch (error) {
            return { error: error }
        }
    }

    async createCart() {
        try {
            let aux = await this.getCart();
            aux.push({
                id: await this.autoId(),
                products: []
            })
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
        } catch (e) {
            return { error: e }
        }
    }

    async addToCart(id, product) {
        let quantity = 1;
        let prod = {
            product: product.id,
            quantity: quantity
        }
        try {
            let result = await this.getCart();
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
            return { error: e }
        }
    }



}
module.exports = CartManager;