const {Router } = require('express');
const cartRouter = Router();
const CartManager = require('../cartManager')
const aux = new CartManager();

cartRouter.get('/', (req,res) =>{
    res.send(aux.getCart());
})

cartRouter.get('/:cid', async (req,res) =>{
    let cartID = req.params.cid;
    let result = await aux.getProductsListById(cartID)
    res.send(result)
})

cartRouter.post('/', async (req,res) =>{
    try{
        await aux.createCart();
        res.status(200).send({status: 'success', message: 'created succesfully'})
    }catch(e){
        res.status(500).send({error: e})
    }
})
//// revisar /////
cartRouter.post('/cid/product/:pid', (req,res) =>{
    try{
        let cid = req.params.cid;
        let pid = req.params.pid;
        
    }catch{

    }
})


module.exports = cartRouter;