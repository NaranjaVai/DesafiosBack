const fs = require('fs');

class ProductManager {
    // products;

    constructor() {
        this.products = [];
        this.path = '\products.json' ;
    }

    async autoId(){
        let result = await this.getProducts();
        return ((result[this.products.length - 1].id) + 1);
    }

    async getProducts() {
        let result = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        return result;
    }

    async getProductsById(id) {
        let result = await this.getProducts();
        let product = result.find(e => e.id == id);
        return product;
    }

    async addProduct(product) {
        try {
            if (product.title && product.description && product.price) {
                let auxProducts = await this.getProducts();
                auxProducts.push({
                        id: await this.autoId(),
                        title: product.title,
                        description: product.description,
                        price: product.price,
                    })
               return await fs.promises.writeFile(this.path, JSON.stringify(auxProducts));
            }else { return 'Error' }
        } catch(e) {
            return {error: e.message}
        }
    }   
    async removeById(id) {
        let result = await this.getProducts();
        let resultParse = JSON.parse(result);
        if (resultParse.find(e => e.id = id)) {
            console.log('Producto removido -----', this.products[id]);
            resultParse.splice(id, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(resultParse));
        } else {
            return 'Error';
        }
    }
    
}

module.exports = ProductManager;
