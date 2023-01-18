const { log } = require('console');
const fs = require('fs');
const { json } = require('node:stream/consumers');
const fields = ['title', 'description', 'thumbnail', 'price', 'code', 'stock']

class ProductManager {
    // products;

    constructor() {
        this.products = [];
        this.path = path.resolve(__dirname, '\products.json' ) ;
    }

    getProducts() {
        console.log('Impriendo productos de la lista');
        let result = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        console.log(result);
    }

    getProductsById(id) {
        console.log('Buscando producto por identicador');
        let result = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        let product = result.find(e => e.id == id);
        return product;
        (result.find(e => e.id == id)) ? console.log('-------- Producto Encontrado --------', '\n', result[id]) : console.log('-- Not Found --');
    }

    async removeAll() {
        return await fs.promises.writeFile(this.path, '[]');
    }

    async removeById(id) {
        let result = fs.readFileSync(this.path, 'utf-8');
        let resultParse = JSON.parse(result);
        if (resultParse.find(e => e.id = id)) {
            console.log('Producto removido -----', this.products[id]);
            resultParse.splice(id, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(resultParse));
        } else {
            console.log('Producto inexistente');
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        if (arguments.length < 6) {
            return console.log('Algun campo esta vacio', '\n', title);
        }

        try {
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            console.log('----------- Productos antes-----------', this.products);
            if (this.products.find(e => e.code == code)) {
                console.log('Codigo Repetido');
            } else {
                console.log('Producto agregado');
                this.products.push({
                    id: this.products.length,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                })
            }
            console.log(this.products);
            fs.writeFileSync(this.path, JSON.stringify(this.products));

        } catch {
            if (this.products.length == 0) {
                this.products.push({
                    id: 0,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                })
            }
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        }
    }

    updateProduct(id, field, value) {
        if (fields.includes(field)) {
            let result = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            let aux = result.find(e => e.id == id);
            if (aux != undefined) {
                aux[field] = value;
                result.splice(id,1,aux)
                console.log(result);
                fs.writeFileSync(this.path, JSON.stringify(result));
            } else {
                console.log('El producto no existe');
            }

        } else {
            console.log('Campo no existe');
        }
    }
}

let gestor = new ProductManager();
gestor.addProduct('fernet', 'aperitivo', 3500, 'fernet.com', 24, 100);
gestor.addProduct('heineken', 'cerveza', 1500, 'heineken.com', 21, 50);
gestor.addProduct('budweiser', 'cerveza', 2500, 'budweiser.com', 18, 150);
gestor.addProduct('abc', 'cerveza', 4500, 'abc.com', 14, 350);
//gestor.updateProduct(3, 'price', 2000);
//gestor.getProducts();
//gestor.getProductsById(1);
//gestor.getProductsById(6);
//gestor.removeById(2);
//gestor.removeAll();
