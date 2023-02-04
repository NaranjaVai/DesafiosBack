const {Router} = require('express');
const productRouter = Router();
const ProductManager = require('../productManager')
const aux = new ProductManager();


productRouter.get('/', async (req,res) =>{
    let {limit} = req.query;
    let result = await aux.getProducts();
    try{
        if (!limit){
            res.send(result);
        }else{
            let newArr = result.splice(0,limit);
            res.send(newArr);
        }
    }catch(e){
        res.status(500).send({error : e.message});
    }
})

productRouter.get('/:pId', async (req,res) =>{
    let pId = req.params.pId;
    let result = await aux.getProductsById(pId);
    try{        
        (!result) ? res.status(400).send({status: 'Not Found', error : 'Id no existe'}) : res.send(result);
    }catch(e){
        res.status(500).send({error : e.message});
    }
})  

productRouter.post('/', async (req,res) => {
    let result = await aux.addProduct(req.body)
    try{
        (result === 'Error') ? res.send({error : 'Faltan campos'}) : res.send(`Producto agregado ${req.body}`);
    }catch(error) {
        res.status(500).send({error: error.message})
    }

})

productRouter.put('/:pid',async (req,res) => {
    let result = await aux.updateProduct(req.params.pid)
    try{
        (result === 'Error') ? res.send({error : 'El producto no existe'}) : res.send(`Producto con ${req.params.pid} actualizado con exito`);
    }catch(error) {
        res.status(500).send({error: error.message})
    }
})

productRouter.delete('/:pid',async (req,res) =>{
    let result = await aux.removeById(req.params.pid)
    try{
        (result === 'Error') ? res.send({error : 'El producto no existe'}) : res.send(`Producto con ${req.params.pid} borrado con exito`);
    }catch(error) {
        res.status(500).send({error: error.message})
    }
})


module.exports = productRouter;