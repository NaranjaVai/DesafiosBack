const {Router} = require('express');
const productRouter = Router();
const ProductManager = require('../productManager')
const aux = new ProductManager();


productRouter.get('/', async (req,res) =>{
    let products = await aux.getProducts();
    res.render('home', {products})        
})

productRouter.get('/:pId', async (req,res) =>{
    let pId = req.params.pId;
    let result = await aux.getProductsById(pId);        
        (result) ? res.render({product: result}) : res.status(400).render({status:'Not Found', error: 'Invalid ID'});
})  

module.exports = productRouter;