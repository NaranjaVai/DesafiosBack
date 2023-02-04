const {Router } = require('express');
const cartRouter = Router();
const CartManager = require('../cartManager')
const ProductManager = require('../productManager');
const aux = new CartManager();
const auxProducts = new ProductManager();

cartRouter.get('/', (req,res) =>{
    res.send(aux.getCart());
})

cartRouter.get('/:cid', async (req,res) =>{
    let cartID = parseInt(req.params.cid);
    let result = await aux.getProductsListById(cartID)
    res.send(result)
})

cartRouter.post('/', async (req,res) =>{
    try{
        await aux.createCart();
        res.status(200).send({status: 'success', message: 'created successfully'})
    }catch(e){
        res.status(500).send({error: e.message})
    }
})

cartRouter.post('/cid/product/:pid', (req,res) =>{
    try{
        let cid = parseInt(req.params.cid);
        let pid = parseInt(req.params.pid);
        let cartProduct = auxProducts.getProductsById(pid);
        aux.addToCart(cartProduct.id, cid)
        res.status(200).send({status: 'success', message: 'add successfully'})
    }catch{
        res.status(500).send({error: e.message})
    }
})


module.exports = cartRouter;